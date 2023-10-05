import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RuleForm } from '../_models/forms/rule-form';

@Injectable({
  providedIn: 'root',
})
export class RuleService {
  BASE_URL: string = 'http://localhost:8080';

  constructor(private _httpClient: HttpClient) {}

  getRules() {
    return this._httpClient.get(this.BASE_URL + '/rules/list');
  }

  getRule(id: number | string) {
    return this._httpClient.get(this.BASE_URL + '/rules/' + id);
  }

  updateRule(id: number | string, tosend: RuleForm) {
    return this._httpClient.patch(this.BASE_URL + '/rules/update/' + id, tosend);
  }

  deleteRule(id: number | string) {
    return this._httpClient.delete(this.BASE_URL + '/rules/delete/' + id);
  }

  createRule(tosend: RuleForm) {
    return this._httpClient.post(this.BASE_URL + '/rules/create', tosend);
  }
}
