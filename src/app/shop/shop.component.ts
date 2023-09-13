import { Component } from '@angular/core';
import { ShopService } from '../_services/shop.service';
import { ShopCategory } from '../_models/shop-category';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
})
export class ShopComponent {
  categories: ShopCategory[] = [];
  selectedCat: ShopCategory = new ShopCategory()
  user: User = new User();
  constructor(private shopService: ShopService, private userService: UserService) {
    this.shopService.getCategories().subscribe((data) => {
      this.categories = (data as ShopCategory[]).sort(
        (a, b) => a.displayOrder - b.displayOrder
      );
      if (this.categories.length > 0) this.selectedCat = this.categories[0];
    });

    this.userService.getUser(1).subscribe((data) => {
      this.user = data as User;
    });
  }
}
