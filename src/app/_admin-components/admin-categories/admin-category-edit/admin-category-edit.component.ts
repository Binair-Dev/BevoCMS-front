import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopCategory } from 'src/app/_models/shop-category';
import { ShopCategoryUpdate } from 'src/app/_models/shop-category-update';
import { ShopService } from 'src/app/_services/shop.service';
import { TokenDecoderService } from 'src/app/_services/token-decoder.service';

@Component({
  selector: 'app-admin-category-edit',
  templateUrl: './admin-category-edit.component.html',
})
export class AdminCategoryEditComponent {
  id: string = '';
  categoryFormGroup: FormGroup = new FormGroup({});
  category: ShopCategory = new ShopCategory();

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private shopService: ShopService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') as string;
    });

    this.categoryFormGroup = this.fb.group({
      title: ['', [Validators.minLength(3), Validators.required]],
      displayOrder: ['', [Validators.min(1), Validators.required]],
    });

    this.shopService.getCategory(this.id).subscribe((data) => {
      this.category = data as ShopCategory;
      this.categoryFormGroup.setValue({
        title: this.category.title,
        displayOrder: this.category.displayOrder,
      });
    });
  }

  updateCategory() {
    if (this.categoryFormGroup.valid) {
      let tosend = new ShopCategoryUpdate();
      tosend.title = this.categoryFormGroup.controls['title'].value;
      tosend.displayOrder =
        this.categoryFormGroup.controls['displayOrder'].value;
      this.shopService.updateCategory(this.id, tosend).subscribe((data) => {
        this.router.navigateByUrl('/admin/categories');
      });
    }
  }

  deleteCategory() {
    this.shopService.deleteCategory(this.id).subscribe((data) => {
      this.router.navigateByUrl('/admin/categories');
    })
  }
}
