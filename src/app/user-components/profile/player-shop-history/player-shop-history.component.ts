import { Component } from '@angular/core';
import { ShopItem } from 'src/app/_models/shop-item';
import { ShopTransaction } from 'src/app/_models/shop-transaction';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-player-shop-history',
  templateUrl: './player-shop-history.component.html'
})
export class PlayerShopHistoryComponent {
  buyHistory: ShopTransaction[] = []

  constructor(private userService: UserService) {
    this.userService.getShopHistory().subscribe((data) => {
      this.buyHistory = data as ShopTransaction[];
    })
  }
}
