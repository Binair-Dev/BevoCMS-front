import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Server } from 'src/app/_models/server';
import { ShopCategory } from 'src/app/_models/shop-category';
import { ShopItem } from 'src/app/_models/shop-item';
import { ShopItemForm } from 'src/app/_models/shop-item-form';
import { ServerService } from 'src/app/_services/server.service';
import { ShopService } from 'src/app/_services/shop.service';

@Component({
  selector: 'app-admin-article-edit',
  templateUrl: './admin-article-edit.component.html',
})
export class AdminArticleEditComponent {
  categories: ShopCategory[] = [];
  articleFormGroup: FormGroup = new FormGroup({});
  article: ShopItem = new ShopItem();
  servers: Server[] = [];
  id: string = '';

  constructor(
    private shopService: ShopService,
    private serverService: ServerService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
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

    this.serverService.getServers().subscribe((data) => {
      this.servers = data as Server[];
    });

    this.shopService.getCategories().subscribe((data) => {
      this.categories = data as ShopCategory[];
      this.categories.forEach((element) => {
        element.shopItems.forEach((shopitems) => {
          if (shopitems.id + '' === this.id) {
            this.article = shopitems as ShopItem;
            this.articleFormGroup.setValue({
              title: this.article.title,
              description: this.article.description,
              image: this.article.image,
              contentImage: this.article.content_image,
              price: this.article.price,
              command: this.article.command,
              shopCategory: this.article.shop_category_id,
              server: this.servers.find((s) => s.title === this.article.server_name)?.id,
            });
          }
        });
      });
    });
  }

  updateArticle() {
    if(this.articleFormGroup.valid) {
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

        this.shopService.updateArticle(this.id, tosend).subscribe((data) => {
          console.log(data);
          this.router.navigateByUrl('/admin/articles')
        });
      }
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') as string;
    });
  }

  deleteArticle(id: number | string) {
    this.shopService.deleteArticle(id).subscribe((data) => {
      window.location.reload();
    });
  }
}
