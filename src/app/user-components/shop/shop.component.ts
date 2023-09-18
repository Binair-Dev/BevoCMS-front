import { Component } from '@angular/core';
import { ShopService } from '../../_services/shop.service';
import { ShopCategory } from '../../_models/shop-category';
import { UserService } from '../../_services/user.service';
import { User } from '../../_models/user';
import { DecodedToken } from 'src/app/_models/decodedToken';
import { TokenDecoderService } from 'src/app/_services/token-decoder.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
})
export class ShopComponent {
  categories: ShopCategory[] = [];
  selectedCat: ShopCategory = new ShopCategory();
  user: User = new User();
  decodedToken: DecodedToken = new DecodedToken();
  constructor(
    private shopService: ShopService,
    private userService: UserService,
    private tokenDecodeService: TokenDecoderService
  ) {
    this.shopService.getCategories().subscribe((data) => {
      this.categories = (data as ShopCategory[]).sort(
        (a, b) => a.displayOrder - b.displayOrder
      );
      if (this.categories.length > 0) this.selectedCat = this.categories[0];
    });

    if (localStorage.getItem('token') != null) {
      this.decodedToken = tokenDecodeService.getDecodedAccessToken(
        localStorage.getItem('token') as string
      ) as DecodedToken;
    }

    this.userService.getUser(this.decodedToken.id).subscribe((data) => {
      this.user = data as User;
    });
  }
}
