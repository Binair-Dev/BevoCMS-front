import { Component } from '@angular/core';
import { DecodedToken } from 'src/app/_models/decoded-token';
import { User } from 'src/app/_models/user';
import { TokenDecoderService } from 'src/app/_services/token-decoder.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
})
export class AdminSidebarComponent {
  user: User = new User();
  decodedToken: DecodedToken = new DecodedToken();

  constructor(
    private userService: UserService,
    private jwtService: TokenDecoderService
  ) {
    if (localStorage.getItem('token') != null) {
      this.decodedToken = this.jwtService.getDecodedAccessToken(
        localStorage.getItem('token') as string
      ) as DecodedToken;
    }

    this.userService.getUser(this.decodedToken.id).subscribe((data) => {
      this.user = data as User;
    });
  }
}
