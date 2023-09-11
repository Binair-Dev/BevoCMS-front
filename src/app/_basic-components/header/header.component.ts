import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { StateStoreService } from 'src/app/shared/state-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  isConnect: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.isConnect = authService.isConnected();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
    window.location.reload();
  }
}
