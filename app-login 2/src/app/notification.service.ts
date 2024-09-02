import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JobApplication } from './admin/admin.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private newNotificationsSource = new BehaviorSubject<{ job: JobApplication; message: string }[]>([]);
  newNotifications$ = this.newNotificationsSource.asObservable();

  setNewNotifications(notifications: { job: JobApplication; message: string }[]) {
    this.newNotificationsSource.next(notifications);
  }
}