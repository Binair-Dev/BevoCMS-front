import { Component } from '@angular/core';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent {
  constructor(private authService: AuthService) {
    if(this.authService.isConnected())
      this.authService.logout();
  }
}
