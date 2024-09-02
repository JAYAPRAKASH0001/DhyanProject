import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { AdminJobListComponent } from './admin-job-list/admin-job-list.component';
import { authGuard } from './auth.guard'; // import the guard

export const routes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    { 
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [authGuard] 
    },
    {
        path: 'user',
        component: UserComponent,
        canActivate: [authGuard] 
    },
    {
        path: 'dash',
        component: UserdashboardComponent,
        canActivate: [authGuard] 
    },
    {
        path: 'joblist',
        component: AdminJobListComponent,
        canActivate: [authGuard] 
    }
];
