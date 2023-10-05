import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Server } from 'src/app/_models/server';
import { ShopCategory } from 'src/app/_models/shop-category';
import { ShopCategoryForm } from 'src/app/_models/shop-category-form';
import { ShopItemForm } from 'src/app/_models/shop-item-form';
import { ServerService } from 'src/app/_services/server.service';
import { ShopService } from 'src/app/_services/shop.service';

@Component({
  selector: 'app-admin-articles',
  templateUrl: './admin-articles.component.html',
})
export class AdminArticlesComponent {
  categories: ShopCategory[] = [];
  articleFormGroup: FormGroup = new FormGroup({});
  servers: Server[] = []

  constructor(
    private shopService: ShopService,
    private serverService: ServerService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.articleFormGroup = this.fb.group({
      title: ['', [Validators.minLength(3), Validators.required]],
      description: ['', [Validators.minLength(3), Validators.required]],
      image: ['', [Validators.minLength(3), Validators.required]],
      contentImage: ['', [Validators.minLength(3), Validators.required]],
      price: ['', [Validators.min(1), Validators.required]],
      command: ['', [Validators.minLength(3), Validators.required]],
      shopCategory: ['', [Validators.min(1), Validators.required]],
      server: ['', [Validators.min(1), Validators.required]],
    });

    this.shopService.getCategories().subscribe((data) => {
      this.categories = data as ShopCategory[];
    });

    this.serverService.getServers().subscribe((data) => {
      this.servers = data as Server[];
    });
  }

  createArticle() {
    if (this.articleFormGroup.valid) {
      let tosend = new ShopItemForm();
      tosend.title = this.articleFormGroup.controls['title'].value;
      tosend.description = this.articleFormGroup.controls['description'].value;
      tosend.image = this.articleFormGroup.controls['image'].value;
      tosend.contentImage = this.articleFormGroup.controls['contentImage'].value;
      tosend.price = this.articleFormGroup.controls['price'].value;
      tosend.command = this.articleFormGroup.controls['command'].value;
      tosend.shopCategory = this.articleFormGroup.controls['shopCategory'].value;
      tosend.server = this.articleFormGroup.controls['server'].value;

      this.shopService.createArticle(tosend).subscribe((data) => {
        window.location.reload();
      });
    }
  }

  editArticle(id: number | string) {
    this.router.navigateByUrl('admin/article/' + id);
  }

  deleteArticle(id: number | string) {
    this.shopService.deleteArticle(id).subscribe((data) => {
      window.location.reload();
    });
  }
}
