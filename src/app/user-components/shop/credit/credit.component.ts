import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { get } from 'scriptjs';
import { ShopService } from 'src/app/_services/shop.service';
import { Router } from '@angular/router';
import { DedipassService } from 'src/app/_services/dedipass.service';
import { TokenDecoderService } from 'src/app/_services/token-decoder.service';
import { DecodedToken } from 'src/app/_models/decodedToken';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
})
export class CreditComponent implements OnInit {
  user: User = new User();
  decodedToken: DecodedToken = new DecodedToken();

  constructor(
    private dedipassService: DedipassService,
    private userService: UserService,
    private shopService: ShopService,
    private router: Router,
    private tokenDecodeService: TokenDecoderService
  ) {
    if (localStorage.getItem('token') != null) {
      this.decodedToken = tokenDecodeService.getDecodedAccessToken(
        localStorage.getItem('token') as string
      ) as DecodedToken;
    }

    this.userService.getUser(this.decodedToken.id).subscribe((data) => {
      this.user = data as User;
    });
  }

  ngOnInit() {
    get('https://api.dedipass.com/v1/pay.js', () => {});
  }
}
