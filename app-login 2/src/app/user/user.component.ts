import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NavbarComponent } from '../navbar/navbar.component';
import { NotificationService } from '../notification.service';
import { Router } from '@angular/router';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
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

interface ApplicationStatus {
  status: string;
  stage: string;
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NavbarComponent, LoadingSpinnerComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private apiUrl = 'http://localhost:8080/api/job-applications';
  private studentIdApiUrl = 'http://localhost:8080/api/students/id-by-email';
  private applyUrl = 'http://localhost:8080/api/applications/apply';
  private applicationsByStudentUrl = 'http://localhost:8080/api/applications/student';

  jobApplications: JobApplication[] = [];
  email: string | null = null;
  studentId: number | null = null;
  applicationStatuses: { [key: number]: ApplicationStatus | null } = {};
  notifications: { job: JobApplication; message: string }[] = [];
  
  showModal = false;
  selectedJob: JobApplication | null = null;
  
  stages: string[] = ['WrittenTest', 'Technical Interview 1', 'Technical Interview 2', 'HR Round', 'Job Offer'];
  currentStageIndex: number = 0;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private notificationService: NotificationService,
    private router: Router
  ) {}
  isLoading: boolean = true;
  ngOnInit(): void {
    this.loadJobApplications();
    this.loadStudentId();
      
       setTimeout(() => {
        this.isLoading = false;
    }, 500); 
  }

  loadJobApplications(): void {
    this.getJobApplications().pipe(
      catchError(error => {
        console.error('Error fetching job applications:', error);
        return of([]); 
      })
    ).subscribe(data => {
      this.jobApplications = data;
      this.checkApplicationStatuses();
    });
  }

  loadStudentId(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      if (this.email) {
        this.getStudentIdByEmail(this.email).pipe(
          catchError(error => {
            console.error('Error fetching student ID:', error);
            return of(null); 
          }),
          map(id => {
            if (id !== null) {
              this.studentId = id;
              this.checkApplicationStatuses();
            } else {
              console.error('Student ID not found for email:', this.email);
            }
          })
        ).subscribe();
      }
    });
  }

  getJobApplications() {
    return this.http.get<JobApplication[]>(this.apiUrl);
  }

  getStudentIdByEmail(email: string) {
    return this.http.get<number>(`${this.studentIdApiUrl}?email=${email}`);
  }

  getApplicationsByStudentId(studentId: number) {
    return this.http.get<any[]>(`${this.applicationsByStudentUrl}/${studentId}`);
  }

  checkApplicationStatuses(): void {
    if (this.studentId) {
      this.getApplicationsByStudentId(this.studentId).pipe(
        catchError(error => {
          console.error('Error fetching student applications:', error);
          return of([]); 
        })
      ).subscribe(applications => {
        this.applicationStatuses = {};
        const newNotifications: { job: JobApplication; message: string }[] = [];

        applications.forEach(app => {
          const jobId = app.jobApplication.id;
          const newStatus = app.status;
          const newStage = app.stage;

          if (!this.applicationStatuses[jobId]) {
            this.applicationStatuses[jobId] = { status: newStatus, stage: newStage };
            newNotifications.push({
              job: app.jobApplication,
              message: `Applied for ${app.jobApplication.company_name}. Status: ${newStatus}, Stage: ${newStage}`
            });
          } else {
            const currentApplicationStatus = this.applicationStatuses[jobId];

            if (currentApplicationStatus) {
              const oldStatus = currentApplicationStatus.status;
              const oldStage = currentApplicationStatus.stage;

              if (newStatus !== oldStatus || newStage !== oldStage) {
                newNotifications.push({
                  job: app.jobApplication,
                  message: `Updated status for ${app.jobApplication.company_name}. Status: ${newStatus}, Stage: ${newStage}`
                });

                this.applicationStatuses[jobId] = {
                  ...currentApplicationStatus,
                  status: newStatus,
                  stage: newStage,
                };
              }
            }
          }
        });

        this.notificationService.setNewNotifications(newNotifications);
      });
    }
  }

  apply(job: JobApplication): void {
    if (this.studentId) {
      this.http.post(this.applyUrl, {
        student: { id: this.studentId },
        jobApplication: { id: job.id },
        status: 'PENDING',
        stage: 'Applied',
        is_stage: 0
      }).pipe(
        catchError(error => {
          console.error('Error applying for job:', error);
          return of(null);
        })
      ).subscribe(response => {
        if (response) {
          this.checkApplicationStatuses(); 
          this.toastr.success('Your application was submitted successfully!', 'Application Submitted');
        } else {
          console.error('Failed to submit application');
        }
      });
    } else {
      console.error('Student ID is not available');
    }
  }

  viewDetails(job: JobApplication): void {
    this.selectedJob = job;
    this.currentStageIndex = this.stages.indexOf(this.applicationStatuses[job.id]?.stage || 'WrittenTest');
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  hasApplied(jobId: number): boolean {
    return !!this.applicationStatuses[jobId];
  }

  logout(): void {
    localStorage.removeItem('sessionUser');  
    this.router.navigate(['/login']);   
    this.toastr.info('You have been logged out.');
  }

 
}