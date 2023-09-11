import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../_models/login';
import { TokenResponse } from '../_models/tokenResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  isConnect: boolean = false;
  loginForm: FormGroup = new FormGroup({});
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.isConnect = this.authService.isConnected();
    if(this.isConnect) {
      this.router.navigateByUrl('');
    }

    this.loginForm = this.fb.group({
      username: [
        '',
        [
          Validators.minLength(3),
          Validators.maxLength(16),
          Validators.required,
        ],
      ],
      password: [
        '',
        [
          Validators.minLength(8),
          Validators.maxLength(16),
          Validators.required,
        ],
      ],
    });
  }

  login() {
    if (this.loginForm.valid) {
      let log = new Login();
      log.username = this.loginForm.value['username'];
      log.password = this.loginForm.value['password'];
      this.authService.login(log).subscribe(
        (data) => {
          localStorage.setItem('token', (data as TokenResponse).token);
          this.successMessage = 'Authentification réussie!';
          setTimeout(() => {
            this.router.navigateByUrl('');
          }, 500);
        },
        (error) => (this.errorMessage = error.error.message)
      );
    }
  }
}
