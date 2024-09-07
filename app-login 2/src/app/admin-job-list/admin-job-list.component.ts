import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';
import { ToastrService } from 'ngx-toastr';

interface JobApplication {
  id: number;
  company_name: string;
  type: string;
  role: string;
  status: string;
  location: string;
  package_lpa: string;
  discreption: string;
  no_rounds: string;
  apply_before: string;
}

interface ApplicantDTO {
  id: number;  
  studentName: string;
  studentEmail: string;
  status: string;
  stage: string;
}
interface Student {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  dob: string;
  phoneNumber: string;
  mark10th: number;
  mark12th: number;
  ugMark: number;
  backlog: number;
  activeBacklog: number;
  interestedCourse: string;
}

@Component({
  selector: 'app-admin-job-list',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule, NavbarComponent],
  templateUrl: './admin-job-list.component.html',
  styleUrls: ['./admin-job-list.component.css']
})
export class AdminJobListComponent implements OnInit {
  private apiUrl = 'http://localhost:8080/api/job-applications';
  private applicationApiUrl = 'http://localhost:8080/api/applications/job';
  jobApplications: JobApplication[] = [];
  selectedApplicants: ApplicantDTO[] = [];
  searchTerm: string = ''; 
  isModalOpen: boolean = false; 
  isEditModalOpen: boolean = false; 
  menuJobId: number | null = null; 
  currentJob: JobApplication = {} as JobApplication;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.fetchJobApplications();
  }

  fetchJobApplications(): void {
    this.getJobApplications().subscribe(
      (data) => {
        this.jobApplications = data;
        console.log('Job Applications:', data);
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  getJobApplications(): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(this.apiUrl, { withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }
  
  viewDetails(jobId: number): void {
    this.getApplicantsByJobId(jobId).subscribe(
      (data) => {
        this.selectedApplicants = data;
        this.isModalOpen = true;
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  getApplicantsByJobId(jobId: number): Observable<ApplicantDTO[]> {
    return this.http.get<ApplicantDTO[]>(`${this.applicationApiUrl}/${jobId}`, { withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }

  updateStatus(applicant: ApplicantDTO, status: string): void {
    const apiUrl = `http://localhost:8080/api/applications/${applicant.id}/status?status=${status}`;
    this.http.put(apiUrl, {}, { withCredentials: true }).subscribe(
      () => {
        applicant.status = status;
        console.log(`Updated status of applicant ${applicant.studentName} to ${status}`);
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  stageList = ['Applied', 'WrittenTest', 'Technical Interview 1', 'Technical Interview 2', 'HR Round', 'Job Offer'];

  updateStage(applicant: ApplicantDTO, stage: string): void {
    if (applicant.status !== 'ACCEPTED') {
      this.toastr.warning('Accept the application first');
      return;
    }
  
    const apiUrl = `http://localhost:8080/api/applications/${applicant.id}/stage?stage=${stage}&is_stage=${this.stageList.indexOf(stage)}`;
    this.http.put(apiUrl, {}, { withCredentials: true }).subscribe(
      () => {
        const index = this.selectedApplicants.findIndex(a => a.id === applicant.id);
        if (index !== -1) {
          this.selectedApplicants[index].stage = stage;
          console.log(`Updated stage of applicant ${applicant.studentName} to ${stage}`);
        }
      },
      (error) => {
        this.handleError(error);
      }
    );
  }
  

  getStageClass(applicant: ApplicantDTO, stage: string): string {
    const currentStageIndex = this.stageList.indexOf(applicant.stage);
    const stageIndex = this.stageList.indexOf(stage);
    if (stageIndex < currentStageIndex) return 'stage-completed';
    if (stageIndex === currentStageIndex) return 'stage-current';
    return 'stage-pending';
  }

  searchJobs(): void {
    if (this.searchTerm) {
      this.jobApplications = this.jobApplications.filter(job => 
        job.company_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        job.role.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.fetchJobApplications(); 
    }
  }

  openMenu(jobId: number): void {
    this.menuJobId = this.menuJobId === jobId ? null : jobId;
  }

  editJob(job: JobApplication): void {
    this.currentJob = { ...job };
    this.isEditModalOpen = true;
  }

  deleteJob(jobId: number): void {
    const apiUrl = `http://localhost:8080/api/job-applications/${jobId}`;
    this.http.delete(apiUrl, { withCredentials: true }).subscribe(
      () => {
        this.jobApplications = this.jobApplications.filter(job => job.id !== jobId);
        console.log(`Deleted job with ID ${jobId}`);
        this.toastr.success('JobApplication Deleted','Successfully!');
      },
      (error) => {
        this.handleError(error);
        this.toastr.error('Failed to delete job application');
      }
    );
  }

  saveJob(): void {
    const apiUrl = `http://localhost:8080/api/job-applications/${this.currentJob.id}`;
    this.http.put(apiUrl, this.currentJob, { withCredentials: true }).subscribe(
      () => {
        this.fetchJobApplications(); 
        this.closeEditModal(); 
        console.log(`Updated job with ID ${this.currentJob.id}`);
        this.toastr.success('Updated Successfully!');
      },
      (error) => {
        this.handleError(error);
        this.toastr.warning('Failed to update job application');
      }
    );
  }

  closeModal(): void {
    this.isModalOpen = false; 
  }

  closeEditModal(): void {
    this.isEditModalOpen = false; 
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred: ';
    if (error.error instanceof ErrorEvent) {
      errorMessage += `Client-side error: ${error.error.message}`;
    } else {
      errorMessage += `Server-side error: ${error.status} ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'ACCEPTED':
        return 'status-accepted';
      case 'REJECTED':
        return 'status-rejected';
      default:
        return 'status-pending';
    }
  }

  isApplicantDetailModalOpen: boolean = false;
  selectedApplicantDetails: Student | null = null;

  viewApplicantDetails(email: string): void {
    this.getStudentByEmail(email).subscribe(
        (data) => {
            this.selectedApplicantDetails = data;
            this.isApplicantDetailModalOpen = true;
            console.log('Applicant details for email', email, ':', data);
        },
        (error) => {
            this.handleError(error);
        }
    );
  }

  getStudentByEmail(email: string): Observable<Student> {
    return this.http.get<Student>(`http://localhost:8080/api/students/email/${email}`, { withCredentials: true }).pipe(
        catchError(this.handleError)
    );
  }

  closeApplicantDetailModal(): void {
    this.isApplicantDetailModalOpen = false;
  }
}
