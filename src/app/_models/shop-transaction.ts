import { ShopItem } from "./shop-item";

export class ShopTransaction {
  id: number = 0;
  item: ShopItem = new ShopItem()
  credit: number = 0;
  user_name: string = ""
}
