import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, NavbarComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  jobApplicationObj: JobApplication;

  constructor(private http: HttpClient,private toastr: ToastrService,private router: Router) {
    this.jobApplicationObj = new JobApplication();
  }

  onCreateJobApplication() {
    const createJobApplicationUrl = 'http://localhost:8080/api/job-applications/job';  // Adjust the URL if needed
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post(createJobApplicationUrl, this.jobApplicationObj, { headers, responseType: 'text' }).subscribe(
      (response: any) => {
        console.log('Job application created successfully:', response);
        this.toastr.success('Job application' ,'Created Successfully')
        this.router.navigate(['/joblist']); 
      },
      (error: any) => {
        console.error('Job application creation failed:', error);
       this.toastr.error('Job application',' Creation failed');
      }
    );
  }
}

export class JobApplication {
  company_name: string;
  type: string;
  role: string;
  status: string;
  location: string;
  package_lpa: string;
  discreption: string;
  no_rounds: string;
  apply_before: string;

  constructor() {
    this.company_name = '';
    this.type = '';
    this.role = '';
    this.status = '';
    this.location = '';
    this.package_lpa = '';
    this.discreption = '';
    this.no_rounds = '';
    this.apply_before = '';
  }
}
