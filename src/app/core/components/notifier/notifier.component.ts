import { Component, Input } from '@angular/core';
import { NotificationService } from '../../../services/notification/notification.service';
import { INotification } from '../../../models/ultil';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifier.component.html',
  styleUrl: './notifier.component.scss'
})
export class NotifierComponent {

  public notification_color: string = 'green'; //green-blue-yellow-red success-info-warning-error
  
  @Input() content: any;
  
  public message: string = 'Procesado correctamente';

  notifications: INotification[] = [];

  constructor(private notificationService: NotificationService) {
    
  }

  ngOnInit(): void {
    this.notificationService.notifications$.subscribe((notification) => {
       this.notification_color = this.getColor(notification);
      //this.notification_color = 'blue';
      this.notifications.push(notification);
      setTimeout(() => {
        this.removeNotification(notification);
      }, 3000); // Remueve la notificación después de 5 segundos
    });
  }

  removeNotification(notification:any): void {
    this.notifications = this.notifications.filter(n => n !== notification);
  }

  getColor(notification:INotification): string {
    let color: string = 'blue';
    if(!notification.type) return color; 

    switch(notification.type) {
      case 'success':
       color = 'green';
        break;
      case 'info':
       color = 'blue';
        break;
      case 'warning':
       color = 'yellow';
        break;
      case 'error':
       color = 'red';
        break;
      default:
       color = 'green';
    }
    return color;
  }
}
