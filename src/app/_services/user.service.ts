import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  BASE_URL: string = 'http://localhost:8080';

  constructor(private _httpClient: HttpClient) {}

  getUser(id: number | string) {
    return this._httpClient.get(this.BASE_URL + '/users/' + id);
  }

  updateUserEmail(id: number, user: any) {
    return this._httpClient.patch(this.BASE_URL + '/users/update/email', user);
  }

  updateUserPassword(id: number, user: any) {
    return this._httpClient.patch(
      this.BASE_URL + '/users/update/password',
      user
    );
  }

  uploadSkin(formData: FormData) {
    return this._httpClient.post(this.BASE_URL + "/skins/upload", formData);
  }
}
