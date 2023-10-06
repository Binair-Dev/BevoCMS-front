import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { Register } from '../../_models/register';
import { TokenResponse } from '../../_models/tokenResponse';
import { confirmPasswordValidator } from '../../_validators/password-confirm.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  isConnect: boolean = false;
  registerForm: FormGroup = new FormGroup({});
  errorMessage: string[] = [];
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.isConnect = this.authService.isConnected();
    if (this.isConnect) {
      this.router.navigateByUrl('');
    }

    this.registerForm = this.fb.group(
      {
        username: [
          '',
          [
            Validators.minLength(3),
            Validators.maxLength(16),
            Validators.required,
          ],
        ],
        email: ['', [Validators.email, Validators.required]],
        password: [
          '',
          [
            Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=!])(?!.*\\s).{8,}$'),
            Validators.minLength(8),
            Validators.maxLength(16),
            Validators.required,
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=!])(?!.*\\s).{8,}$'),
            Validators.minLength(8),
            Validators.maxLength(16),
            Validators.required,
          ],
        ],
        cguCgvChecked: ['', [Validators.required]],
      },
      {
        validators: confirmPasswordValidator,
      }
    );
  }

  register() {
    if (this.registerForm.valid) {
      let log = new Register();
      log.username = this.registerForm.value['username'];
      log.email = this.registerForm.value['email'];
      log.password = this.registerForm.value['password'];
      log.confirmPassword = this.registerForm.value['confirmPassword'];
      this.authService.register(log).subscribe(
        (data) => {
          this.successMessage = 'Enregistrement réussi!';
          this.errorMessage = []
          localStorage.setItem('token', (data as TokenResponse).token);
          setTimeout(() => {
            this.router.navigateByUrl('');
          }, 500);
        },
        (error) => {
          this.successMessage = ''
          this.errorMessage = error.error.messages;
        }
      );
    }
    console.log(this.registerForm)
  }
}
