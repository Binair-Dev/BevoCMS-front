import { Component } from '@angular/core';
import { DecodedToken } from 'src/app/_models/decodedToken';
import { Information } from 'src/app/_models/information';
import { AuthService } from 'src/app/_services/auth.service';
import { StatsService } from 'src/app/_services/stats.service';
import { TokenDecoderService } from 'src/app/_services/token-decoder.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
})
export class NavComponent {
  isConnect: boolean = false;
  stats: Information = new Information();
  decodedToken: DecodedToken = new DecodedToken()
  isAdmin: boolean = false

  constructor(
    private authService: AuthService,
    private statsService: StatsService,
    private tokenDecodeService: TokenDecoderService) {

    if (localStorage.getItem('token')) this.isConnect = true;

    if(this.isConnect) {
      this.decodedToken = this.tokenDecodeService.getDecodedAccessToken(
        localStorage.getItem('token') as string
      ) as DecodedToken;

      this.decodedToken.roles.forEach((element) => {
        if (element.includes('ADMINISTRATEUR')) this.isAdmin = true;
      });
    }


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

    this.statsService.getStats().subscribe((data) => {
      this.stats = data as Information;
    });
  }

  logout() {
    this.authService.logout();
  }
}
