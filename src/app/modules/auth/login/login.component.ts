import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AlertForm, LoginRequest, ResponseLogin} from '../../../models/auth';
import {SolidIconsModule} from "@dimaslz/ng-heroicons";
import CryptoJS from 'crypto-js';
import {AuthService} from '../../../services/auth/auth.service';

import {NgIf} from "@angular/common";
import { LoadingComponent } from '../../../core/components/loading/loading.component';
import { NotificationService } from '../../../services/notification/notification.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SolidIconsModule,
    RouterLink,
    NgIf,
    LoadingComponent
],
  providers:[LoadingComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit, OnDestroy {

  public registerForm: FormGroup;
  public alertForm: AlertForm;
  public loadingForm: boolean;
  public errorMessage: string | null = null;
  private _subscription = new Subscription();

  public user: LoginRequest = {
    username: '',
    password: ''
  };

  constructor(private fb: FormBuilder, private router: Router, private AuthService: AuthService, private notifService: NotificationService) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.alertForm = {type: '', message: '', visible: false};
    this.loadingForm = false;
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    let token = localStorage.getItem('Token');
    if(token && token != '') this.router.navigate(['/home']);
    //localStorage.removeItem('Token');
  }

  private generateRandomIV(): string {
    // Generar un IV aleatorio de 16 bytes
    const iv = CryptoJS.lib.WordArray.random(16);

    // Convertir el IV a formato hexadecimal
    const ivHex = iv.toString(CryptoJS.enc.Hex);

    return ivHex;
  }

  onSendForm() {

    if (this.registerForm.invalid) {
      this.errorMessage = 'Por favor, complete todos los campos';
      this.registerForm.markAllAsTouched()
      return;
    }

    this.loadingForm = true;
    const formValue = this.registerForm.value;

    this.user = {
      ...this.user,
      username: formValue.username,
      password: formValue.password,
    };

    this._subscription.add(
      this.AuthService.loginUser(this.user).subscribe({
        next: (res) => {
          if (res.error) {
            this.errorMessage = 'Error al iniciar sesión';
            this.notifService.show(res.msg??this.errorMessage, 'error', 3000);
            return;
          }
          this.catchTokenUrl(res)
          this.notifService.show(res.msg, 'success', 3000);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Error al iniciar sesión:', err);
          this.errorMessage = 'Error al iniciar sesión';
        },
        complete: () => {
          this.loadingForm = false;
        }

      })
    );
  }

  catchTokenUrl(res: ResponseLogin) {
    const token = res.data.token;
    if (token) {
      localStorage.setItem('Token', token);
    }
  }

}
