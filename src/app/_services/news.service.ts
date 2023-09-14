import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  BASE_URL: string = 'http://localhost:8080';

  constructor(private _httpClient: HttpClient) {}

  getNews() {
    return this._httpClient.get(this.BASE_URL + '/news/list/3');
  }

  getNew(id: number | string) {
    return this._httpClient.get(this.BASE_URL + '/news/' + id);
  }
}