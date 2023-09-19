import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShopCategoryForm } from '../_models/shop-category-form';
import { ShopItemForm } from '../_models/shop-item-form';

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

  updateCategory(id: number | string, tosend: ShopCategoryForm) {
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

  createCategory(tosend: ShopCategoryForm) {
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

  updateArticle(id: number | string, tosend: ShopItemForm) {
    return this._httpClient.patch(
      this.BASE_URL + '/shop-items/update/' + id,
      tosend
    );
  }

  deleteArticle(id: number | string) {
    return this._httpClient.delete(this.BASE_URL + '/shop-items/delete/' + id);
  }

  createArticle(tosend: ShopItemForm) {
    return this._httpClient.post(this.BASE_URL + '/shop-items/create', tosend);
  }
}
