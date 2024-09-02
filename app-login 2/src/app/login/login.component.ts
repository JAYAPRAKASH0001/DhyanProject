import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule,ToastrModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginObj: Login;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loginObj = new Login();
  }

  ngOnInit(): void {
   
    if (isPlatformBrowser(this.platformId)) {
      const sessionUser = localStorage.getItem('sessionUser');
      if (sessionUser && localStorage.getItem('userRole')==='student') {
       
        this.router.navigate(['/user'], { queryParams: { email: sessionUser } });
      }
    }
    if (isPlatformBrowser(this.platformId)) {
      const sessionUser = localStorage.getItem('sessionUser');
      if (sessionUser && localStorage.getItem('userRole')==='admin') {
       
        this.router.navigate(['/joblist'], { queryParams: { email: sessionUser } });
      }
    }
  }

  onSignUp() {
    this.router.navigate(['/joblist']); 
  }

  admin() {
    this.router.navigate(['/joblist']); 
  }

  onLogin() {
    const loginUrl = 'http://localhost:8080/api/students/login';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post(loginUrl, this.loginObj, { headers, withCredentials: true, responseType: 'text' }).subscribe(
      (response: string) => {
        console.log('Login successful:', response);
        this.toastr.success('Login successfully!!');
        
       
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('sessionUser', this.loginObj.email);
        }

        if (response === 'student') {
          localStorage.setItem('userRole','student');
          this.router.navigate(['/user'], { queryParams: { email: this.loginObj.email } });
        } else if (response === 'admin') {
          localStorage.setItem('userRole','admin');
          this.router.navigate(['/joblist'], { queryParams: { email: this.loginObj.email } });
        }
      },
      (error: any) => {
        console.error('Login failed:', error);
        this.toastr.error('Invalid credentials', 'Please try again.');
      }
    );
  }
}

export class Login {
  email: string;
  password: string;

  constructor() {
    this.email = '';
    this.password = '';
  }
}
