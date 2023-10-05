import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewsForm } from '../_models/forms/news-form';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  BASE_URL: string = 'http://localhost:8080';

  constructor(private _httpClient: HttpClient) {}

  getNews() {
    return this._httpClient.get(this.BASE_URL + '/news/list/3');
  }

  getAllNews() {
    return this._httpClient.get(this.BASE_URL + '/news/list');
  }

  getNew(id: number | string) {
    return this._httpClient.get(this.BASE_URL + '/news/' + id);
  }

  updateNew(id: number | string, tosend: NewsForm) {
    return this._httpClient.patch(this.BASE_URL + '/news/update/' + id, tosend);
  }

  deleteNew(id: number | string) {
    return this._httpClient.delete(this.BASE_URL + '/news/delete/' + id);
  }

  createNew(tosend: NewsForm) {
    return this._httpClient.post(this.BASE_URL + '/news/create', tosend);
  }
}
