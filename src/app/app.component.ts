import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotifierComponent } from './core/components/notifier/notifier.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NotifierComponent],
  providers:[],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app-job-trading';
}
