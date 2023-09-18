import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RankService {
  BASE_URL: string = 'http://localhost:8080';

  constructor(private _httpClient: HttpClient) {}

  getRanks() {
    return this._httpClient.get(this.BASE_URL + '/ranks/list');
  }
}
