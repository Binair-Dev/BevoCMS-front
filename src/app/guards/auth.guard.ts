import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { StateStoreService } from '../shared/state-store.service';

export const authGuard: CanActivateFn = (route, state) => {
  let ss = inject(StateStoreService)
  if(localStorage.getItem('token')) {
    return true;
  } else {
    alert('Tu dois être connecté pour accéder a cette page !')
    return false;
  }
};
