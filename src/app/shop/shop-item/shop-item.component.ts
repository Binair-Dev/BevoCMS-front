import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopItem } from 'src/app/_models/shop-item';
import { ShopService } from 'src/app/_services/shop.service';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
})
export class ShopItemComponent {
  constructor(private route: ActivatedRoute, private shopService: ShopService) {}
  itemId: number = 0;
  shopItem: ShopItem = new ShopItem();
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');
      this.itemId = Number(id);
    });

    this.shopService.getShopItem(this.itemId).subscribe((data) => {
      this.shopItem = data as ShopItem;
    })
  }
}
