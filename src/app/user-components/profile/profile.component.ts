import { Component } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DecodedToken } from 'src/app/_models/decoded-token';
import { JwtDecodeOptions } from 'jwt-decode';
import { TokenDecoderService } from 'src/app/_services/token-decoder.service';

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
  errorSkinMessage: string = '';
  successSkinMessage: string = '';
  selectedFile: File | null = null;
  decodedToken: DecodedToken = new DecodedToken();

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private tokenDecodeService: TokenDecoderService
  ) {
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

    if (localStorage.getItem('token') != null) {
      this.decodedToken = tokenDecodeService.getDecodedAccessToken(
        localStorage.getItem('token') as string
      ) as DecodedToken;
    }

    this.userService.getUser(this.decodedToken.id).subscribe((data) => {
      this.user = data as User;
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFile = input.files[0];
    }
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
      userPasswordUpdate.password =
        this.passwordForm.controls['old_password'].value;
      userPasswordUpdate.new_password =
        this.passwordForm.controls['new_password'].value;

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

  onUpload() {
    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.userService.uploadSkin(formData).subscribe(
      (data) => {
        this.successSkinMessage = 'Votre skin a bien été modifié!';
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      (error) => (this.errorSkinMessage = error.error.message)
    );
  }
}
