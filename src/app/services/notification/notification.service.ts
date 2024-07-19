import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  private notificationsSubject = new Subject<{ message: string, type: string, life:number }>();
  public notifications$ = this.notificationsSubject.asObservable();

  show(message: string, type: string = 'info', life: number = 5000): void {
    this.notificationsSubject.next({ message, type, life });
  }
}
