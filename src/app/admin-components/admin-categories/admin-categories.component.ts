import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShopCategory } from 'src/app/_models/shop-category';
import { ShopCategoryForm } from 'src/app/_models/shop-category-form';
import { ShopService } from 'src/app/_services/shop.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
})
export class AdminCategoriesComponent {
  categories: ShopCategory[] = [];
  categoryFormGroup: FormGroup = new FormGroup({});

  constructor(
    private shopService: ShopService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.shopService.getCategories().subscribe((data) => {
      this.categories = data as ShopCategory[];
    });

    this.categoryFormGroup = this.fb.group({
      title: ['', [Validators.minLength(3), Validators.required]],
      displayOrder: ['', [Validators.min(1), Validators.required]],
    });
  }

  createCategory() {
    if (this.categoryFormGroup.valid) {
      let tosend = new ShopCategoryForm();
      tosend.title = this.categoryFormGroup.controls['title'].value;
      tosend.displayOrder =
        this.categoryFormGroup.controls['displayOrder'].value;
      this.shopService.createCategory(tosend).subscribe((data) => {
        window.location.reload();
      });
    }
  }

  editCategory(id: number | string) {
    this.router.navigateByUrl('admin/category/' + id);
  }

  deleteCategory(id: number | string) {
    this.shopService.deleteCategory(id).subscribe((data) => {
      window.location.reload()
    });
  }
}
