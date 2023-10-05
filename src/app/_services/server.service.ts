import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerForm } from '../_models/forms/server-form';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  BASE_URL: string = 'http://localhost:8080';

  constructor(private _httpClient: HttpClient) {}

  getServers() {
    return this._httpClient.get(this.BASE_URL + '/servers/list');
  }

  getServer(id: string | number) {
    return this._httpClient.get(this.BASE_URL + '/servers/' + id);
  }

  updateServer(id: number | string, tosend: ServerForm) {
    return this._httpClient.patch(
      this.BASE_URL + '/servers/update/' + id,
      tosend
    );
  }

  deleteServer(id: number | string) {
    return this._httpClient.delete(this.BASE_URL + '/servers/delete/' + id);
  }

  createServer(tosend: ServerForm) {
    return this._httpClient.post(this.BASE_URL + '/servers/create', tosend);
  }
}
