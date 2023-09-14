import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DedipassService {
  BASE_URL: string = 'http://localhost:8080';

  constructor(private _httpClient: HttpClient) {}

  getNews(data: any) {
    return this._httpClient.post(this.BASE_URL + '/dedipass/check', data);
  }
}
