import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WikiForm } from '../_models/forms/wikiForm';

@Injectable({
  providedIn: 'root',
})
export class WikiService {
  BASE_URL: string = 'http://localhost:8080';

  constructor(private _httpClient: HttpClient) {}

  getWikis() {
    return this._httpClient.get(this.BASE_URL + '/wikis/list');
  }

  getWiki(id: number | string) {
    return this._httpClient.get(this.BASE_URL + '/wikis/' + id);
  }

  updateWiki(id: number | string, tosend: WikiForm) {
    return this._httpClient.patch(
      this.BASE_URL + '/wikis/update/' + id,
      tosend
    );
  }

  deleteWiki(id: number | string) {
    return this._httpClient.delete(
      this.BASE_URL + '/wikis/delete/' + id
    );
  }

  createWiki(tosend: WikiForm) {
    return this._httpClient.post(
      this.BASE_URL + '/wikis/create',
      tosend
    );
  }
}
