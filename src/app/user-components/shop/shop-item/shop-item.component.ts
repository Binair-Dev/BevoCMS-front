import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseMessage } from 'src/app/_models/response-message';
import { ShopItem } from 'src/app/_models/shop-item';
import { ShopService } from 'src/app/_services/shop.service';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
})
export class ShopItemComponent {
  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private router: Router
  ) {}
  itemId: number = 0;
  shopItem: ShopItem = new ShopItem();
  errorMessage: string = '';
  successMessage: string = '';

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');
      this.itemId = Number(id);
    });

    this.shopService.getShopItem(this.itemId).subscribe((data) => {
      this.shopItem = data as ShopItem;
    });
  }

  buyItem(id: number) {
    this.shopService.buyShopItem(id).subscribe(
      (data) => {
        this.successMessage = (data as ResponseMessage).message;
        setTimeout(() => this.router.navigateByUrl('/'), 2000);
      },
      (error) => {
        this.errorMessage = error.error.message;
        setTimeout(() => this.router.navigateByUrl('/'), 2000);
      }
    );
  }
}
