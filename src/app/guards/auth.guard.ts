import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let authService = inject(AuthService);

  let isConnect = authService.isConnected();

  if (isConnect) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};
