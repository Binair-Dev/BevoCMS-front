import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RankForm } from '../_models/forms/rank-form';

@Injectable({
  providedIn: 'root',
})
export class RankService {
  BASE_URL: string = 'http://localhost:8080';

  constructor(private _httpClient: HttpClient) {}

  getRanks() {
    return this._httpClient.get(this.BASE_URL + '/ranks/list');
  }

  getRank(id: number | string) {
    return this._httpClient.get(this.BASE_URL + '/ranks/' + id);
  }

  updateRank(id: number | string, tosend: RankForm) {
    return this._httpClient.patch(
      this.BASE_URL + '/ranks/update/' + id,
      tosend
    );
  }

  deleteRank(id: number | string) {
    return this._httpClient.delete(this.BASE_URL + '/ranks/delete/' + id);
  }

  createRank(tosend: RankForm) {
    return this._httpClient.post(
      this.BASE_URL + '/ranks/create',
      tosend
    );
  }
}
