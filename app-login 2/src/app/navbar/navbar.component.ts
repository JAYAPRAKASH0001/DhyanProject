import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { JobApplication } from '../admin/admin.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showNotifications = false;
  notifications: { job: JobApplication; message: string }[] = [];
  hasNewNotifications = false;
  username: string | null = null; 
  private studentApiUrl = 'http://localhost:8080/api/students/name-by-email';
  private adminApiUrl = 'http://localhost:8080/api/admins/name-by-email';
  isAdmin = false;
  isUser = false;
  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.notificationService.newNotifications$.subscribe(notifications => {
      this.notifications = notifications;
      this.hasNewNotifications = notifications.length > 0;
    });

    if (isPlatformBrowser(this.platformId)) {
      const email = localStorage.getItem('sessionUser');
      const role = localStorage.getItem('userRole');

      console.log('Email:', email);
      console.log('Role:', role);

         

      if (email && role) {
        if (role === 'admin') {
          this.getAdminNameByEmail(email).subscribe(
            (data) => {
              this.username = data.username;
              this.isAdmin = true;
              console.log('Admin Username:', this.username);
            },
            (error) => {
              console.error('Error fetching admin name:', error);
            }
          );
        } else if (role === 'student') {
          this.getStudentNameByEmail(email).subscribe(
            (name) => {

              this.username = `${name.firstName} ${name.lastName}`;
              this.isUser = true;
              console.log('Student Username:', this.username);
            },
            (error) => {
              console.error('Error fetching student name:', error);
            }
          );
        } else {
          console.warn('Unknown role:', role);
        }
      } else {
        console.warn('No email or role found in localStorage');
      }
    } else {
      console.warn('Not running in the browser');
    }
  }

  getStudentNameByEmail(email: string): Observable<{ firstName: string, lastName: string }> {
    return this.http.get<{ firstName: string, lastName: string }>(`${this.studentApiUrl}?email=${email}`)
      .pipe(
        catchError(error => {
          console.error('Error fetching student name:', error);
          return of({ firstName: '', lastName: '' }); 
        })
      );
  }

  getAdminNameByEmail(email: string): Observable<{ username: string }> {
    return this.http.get<{ username: string }>(`${this.adminApiUrl}?email=${email}`)
      .pipe(
        catchError(error => {
          console.error('Error fetching admin name:', error);
          return of({ username: '' }); 
        })
      );
  }

  navigateToAddJob(): void {
    this.router.navigate(['/add-job']);
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('sessionUser');
      localStorage.removeItem('userRole');
    }
    this.router.navigate(['/login']);
  }
}
