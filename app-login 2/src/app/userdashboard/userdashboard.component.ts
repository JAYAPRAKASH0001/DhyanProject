import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { NavbarComponent } from "../navbar/navbar.component";
import { ToastrService } from 'ngx-toastr';


interface Application {
  status: string;
  // Add other properties if needed
}

@Component({
  selector: 'app-userdashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule, NavbarComponent],
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {
  student: any;
  loading = true;
  error: string | null = null;
  appliedCount: number = 0;
  acceptedCount: number = 0;
  rejectedCount: number = 0;
  pendingCount: number = 0;
  isEditModalOpen: boolean = false;

  constructor(private http: HttpClient, private route: ActivatedRoute,private toast :ToastrService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let email = params['email'];
      
      if (!email) {
        email = localStorage.getItem('sessionUser'); 
      }
  
      if (email) {
        this.fetchStudentData(email);
        this.fetchApplicationCounts(email);
      } else {
        this.error = 'Email parameter is missing';
        this.loading = false;
      }
    });
  }
  

  fetchStudentData(email: string): void {
    const url = `http://localhost:8080/api/students/email/${email}`;
    this.http.get<any>(url).subscribe({
      next: (data) => {
        this.student = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching student data', err);
        this.error = 'Failed to fetch student data';
        this.loading = false;
      }
    });
  }

  fetchApplicationCounts(email: string): void {
    const url = `http://localhost:8080/api/applications/student/email/${email}`;
    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.acceptedCount = data.filter(app => app.status === 'ACCEPTED').length;
        this.rejectedCount = data.filter(app => app.status === 'REJECTED').length;
        this.pendingCount = data.filter(app => app.status === 'PENDING').length;
        this.appliedCount = this.acceptedCount + this.rejectedCount + this.pendingCount;
      },
      error: (err) => {
        console.error('Error fetching application counts', err);
        this.error = 'Failed to fetch application counts';
      }
    });
  }

  openEditModal(): void {
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  saveStudent(): void {
    const url = `http://localhost:8080/api/students/${this.student.id}`;
    this.http.put(url, this.student).subscribe({
        next: () => {
            this.fetchStudentData(this.student.email); 
            this.closeEditModal();
            this.toast.success('Data Updated ','Successfully!!');
        },
        error: (err) => {
            console.error('Error updating student data', err);
            this.error = 'Failed to update student data';
        }
    });
}
}