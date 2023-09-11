import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../_models/login';
import { Register } from '../_models/register';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BASE_URL: string = 'http://localhost:8080';

  constructor(
    private _httpClient: HttpClient) {}

  login(login: Login) {
    return this._httpClient.post(this.BASE_URL + '/auth/login', login);
  }

  register(register: Register) {
    return this._httpClient.post(this.BASE_URL + '/auth/register', register);
  }

  logout() {
    localStorage.removeItem('token');
  }

  isConnected() {
    if(localStorage.getItem('token')) {
      return true;
    }
    return false;
  }
}
