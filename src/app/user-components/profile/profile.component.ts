import { Component } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  user: User = new User();
  emailForm: FormGroup = new FormGroup({});
  passwordForm: FormGroup = new FormGroup({});
  errorEmailMessage: string = '';
  successEmailMessage: string = '';
  errorPasswordMessage: string = '';
  successPasswordMessage: string = '';

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.emailForm = this.fb.group({
      old_email: ['', [Validators.email, Validators.required]],
      new_email: ['', [Validators.email, Validators.required]],
    });

    this.passwordForm = this.fb.group({
      old_password: [
        '',
        [
          Validators.minLength(8),
          Validators.maxLength(16),
          Validators.required,
        ],
      ],
      new_password: [
        '',
        [
          Validators.minLength(8),
          Validators.maxLength(16),
          Validators.required,
        ],
      ],
    });

    this.userService.getUser(1).subscribe((data) => {
      this.user = data as User;
    });
  }

  updateEmail() {
    if (this.emailForm.valid) {
      let userEmailUpdate = { email: '', new_email: '' };
      userEmailUpdate.email = this.emailForm.controls['old_email'].value;
      userEmailUpdate.new_email = this.emailForm.controls['new_email'].value;

      this.userService.updateUserEmail(this.user.id, userEmailUpdate).subscribe(
        (data) => {
          this.successEmailMessage = 'Votre email a été modifié avec succès !';
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        (error) => (this.errorEmailMessage = error.error.message)
      );
    }
  }

  updatePassword() {
    if (this.passwordForm.valid) {
      let userPasswordUpdate = { password: '', new_password: '' };
      userPasswordUpdate.password = this.passwordForm.controls['old_password'].value;
      userPasswordUpdate.new_password = this.passwordForm.controls['new_password'].value;

      this.userService
        .updateUserPassword(this.user.id, userPasswordUpdate)
        .subscribe(
          (data) => {
            this.successPasswordMessage =
              'Votre mot de passe a été modifié avec succès !';
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          },
          (error) => (this.errorPasswordMessage = error.error.message)
        );
    }
  }
}
