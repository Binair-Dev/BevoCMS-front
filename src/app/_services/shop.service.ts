import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  BASE_URL: string = 'http://localhost:8080';

  constructor(private _httpClient: HttpClient) {}

  getCategories() {
    return this._httpClient.get(this.BASE_URL + '/shop-categories/list');
  }

  getShopItem(id: number | string) {
    return this._httpClient.get(this.BASE_URL + '/shop-items/' + id);
  }

  addCredit(code: number | string) {
    return this._httpClient.get(this.BASE_URL + '/dedipass/valid?code=' + code);
  }

  buyShopItem(id: number) {
    return this._httpClient.get(
      this.BASE_URL + '/shop/buy?shopItemId=' + id
    );
  }
}
