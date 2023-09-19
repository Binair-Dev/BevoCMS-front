import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShopCategoryUpdate } from '../_models/shop-category-update';
import { ShopItemUpdate } from '../_models/shop-item-update';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  BASE_URL: string = 'http://localhost:8080';

  constructor(private _httpClient: HttpClient) {}

  getCategories() {
    return this._httpClient.get(this.BASE_URL + '/shop-categories/list');
  }

  getCategory(id: number | string) {
    return this._httpClient.get(this.BASE_URL + '/shop-categories/' + id);
  }

  updateCategory(id: number | string, tosend: ShopCategoryUpdate) {
    return this._httpClient.patch(
      this.BASE_URL + '/shop-categories/update/' + id,
      tosend
    );
  }

  deleteCategory(id: number | string) {
    return this._httpClient.delete(
      this.BASE_URL + '/shop-categories/delete/' + id
    );
  }

  createCategory(tosend: ShopCategoryUpdate) {
    return this._httpClient.post(
      this.BASE_URL + '/shop-categories/create',
      tosend
    );
  }

  getShopItem(id: number | string) {
    return this._httpClient.get(this.BASE_URL + '/shop-items/' + id);
  }

  addCredit(code: number | string) {
    return this._httpClient.get(this.BASE_URL + '/dedipass/valid?code=' + code);
  }

  buyShopItem(id: number) {
    return this._httpClient.get(this.BASE_URL + '/shop/buy?shopItemId=' + id);
  }

  getArticles() {
    return this._httpClient.get(this.BASE_URL + '/shop-items/list');
  }

  getArticle(id: number | string) {
    return this._httpClient.get(this.BASE_URL + '/shop-items/' + id);
  }

  updateArticle(id: number | string, tosend: ShopItemUpdate) {
    return this._httpClient.patch(
      this.BASE_URL + '/shop-items/update/' + id,
      tosend
    );
  }

  deleteArticle(id: number | string) {
    return this._httpClient.delete(this.BASE_URL + '/shop-items/delete/' + id);
  }

  createArticle(tosend: ShopItemUpdate) {
    return this._httpClient.post(
      this.BASE_URL + '/shop-items/create',
      tosend
    );
  }
}
