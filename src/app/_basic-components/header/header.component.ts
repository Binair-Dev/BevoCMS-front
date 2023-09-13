import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Information } from 'src/app/_models/information';
import { AuthService } from 'src/app/_services/auth.service';
import { StatsService } from 'src/app/_services/stats.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isConnect: boolean = false;
  stats: Information = new Information();

  constructor(
    private authService: AuthService,
    private statsService: StatsService) {

    if (localStorage.getItem('token')) this.isConnect = true;

    this.authService.isTokenValid().subscribe(
      (data) => {
        if(localStorage.getItem('token'))
          this.isConnect = true;
      },
      (error) => {
        if(localStorage.getItem('token'))
          this.authService.logout();
      }
    );

    this.statsService.getStats().subscribe((data) => {
      this.stats = data as Information;
    });
  }

  logout() {
    this.authService.logout();
  }
}
