import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  BASE_URL: string = 'http://localhost:8080';

  constructor(private _httpClient: HttpClient) {}

  uploadImage(formData: FormData) {
    return this._httpClient.post(this.BASE_URL + '/images/upload', formData);
  }

  getImages() {
    return this._httpClient.get(this.BASE_URL + '/images/get');
  }

  getImage(name: string) {
    return this._httpClient.get(this.BASE_URL + '/images/get/' + name);
  }
}
