import { Component } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { StatsService } from 'src/app/_services/stats.service';

@Component({
  selector: 'app-admin-head',
  templateUrl: './admin-head.component.html',
})
export class AdminHeadComponent {
  isConnect: boolean = false;

  constructor(
    private authService: AuthService
  ) {
    if (localStorage.getItem('token')) this.isConnect = true;

    if (localStorage.getItem('token')) {
      this.authService.isTokenValid().subscribe(
        (data) => {
          this.isConnect = true;
        },
        (error) => {
          if (localStorage.getItem('token')) this.authService.logout();
        }
      );
    }
  }

  logout() {
    this.authService.logout();
  }
}
