import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  studentObj: Student;

  constructor(private http: HttpClient) {
    this.studentObj = new Student();
  }

  onSignup() {
    const signupUrl = 'http://localhost:8080/api/students/signup'; 
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post(signupUrl, this.studentObj, { headers, responseType: 'text' }).subscribe(
      (response: any) => {
        console.log('Sign-up successful:', response);
        alert('Sign-up successful!');
      },
      (error: any) => {
        console.error('Sign-up failed:', error);
        alert('Sign-up failed. Please try again.');
      }
    );
  }
}

export class Student {
  firstName: string;
  lastName: string;
  password: string;
  gender: string;
  dob: string;  
  phoneNumber: string;
  email: string;
  mark10th: number;
  mark12th: number;
  ugMark: number;
  backlog: number;
  activeBacklog: number;
  interestedCourse: string;

  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.password = '';
    this.gender = '';
    this.dob = '';
    this.phoneNumber = '';
    this.email = '';
    this.mark10th = 0;
    this.mark12th = 0;
    this.ugMark = 0;
    this.backlog = 0;
    this.activeBacklog = 0;
    this.interestedCourse = '';
  }
}
