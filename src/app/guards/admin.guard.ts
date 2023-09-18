import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { inject } from '@angular/core';
import { TokenDecoderService } from '../_services/token-decoder.service';
import { DecodedToken } from '../_models/decodedToken';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';

export const adminGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let authService = inject(AuthService);
  let tokenDecodeService = inject(TokenDecoderService);
  let userService = inject(UserService);

  let isConnect = authService.isConnected();

  if (isConnect) {
    let token = tokenDecodeService.getDecodedAccessToken(localStorage.getItem('token') as string) as DecodedToken;
    let user : User = new User();

    userService.getUser(token.id).subscribe((data) => {
      user = data as User;
    })

    if(user.rank.id === 0)
      return true;
    return false;
  } else {
    router.navigateByUrl('/');
    return false;
  }
};
