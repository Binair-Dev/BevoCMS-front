import { ShopItem } from "./shop-item";

export class ShopCategory {
  displayOrder: number = 0;
  id: number = 0
  shopItems: ShopItem[]= []
  title: string = ""
}
