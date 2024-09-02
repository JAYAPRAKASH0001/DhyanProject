import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr, ToastrModule } from 'ngx-toastr'; // Ensure this import matches your ngx-toastr version
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

// Update appConfig to include providers
const updatedAppConfig = {
  ...appConfig,
  providers: [
    ...(appConfig.providers || [ToastrModule.forRoot()]),
    provideHttpClient(), // Existing providers, if any
    provideAnimations(), // Required animations providers
    provideToastr({
      positionClass: 'toast-top-right', // Position of the toast
      timeOut: 3000, // Duration in ms
      extendedTimeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing',
      closeButton: true,
      tapToDismiss: true,
      enableHtml: true,
      preventDuplicates: true,
      toastClass: 'ngx-toastr custom-toast' // Custom class for styling
    })

  ]
};

bootstrapApplication(AppComponent, updatedAppConfig)
  .catch((err) => console.error(err));