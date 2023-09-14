import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../_models/login';
import { Register } from '../_models/register';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BASE_URL: string = 'http://localhost:8080';

  constructor(private _httpClient: HttpClient, private router: Router) {}

  login(login: Login) {
    return this._httpClient.post(this.BASE_URL + '/auth/login', login);
  }

  register(register: Register) {
    return this._httpClient.post(this.BASE_URL + '/auth/register', register);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/')
  }

  isConnected() {
    if(localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  isTokenValid() {
    return this._httpClient.get(this.BASE_URL + '/auth/authenticated');
  }
}
