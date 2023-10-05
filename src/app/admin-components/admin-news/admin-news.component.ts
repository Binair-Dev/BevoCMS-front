import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewsForm } from 'src/app/_models/forms/news-form';
import { News } from 'src/app/_models/news';
import { NewsService } from 'src/app/_services/news.service';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
})
export class AdminNewsComponent {
  formGroup: FormGroup = new FormGroup({});
  news: News[] = [];
  page: number = 0;

  constructor(private newsService: NewsService, private router: Router, private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      title: ['', [Validators.minLength(3)]],
      description: ['', [Validators.minLength(3)]],
      image: ['', [Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.newsService.getAllNews().subscribe((data) => {
      this.news = (data as News[]).reverse();
    });
  }

  editNews(id: number | string) {
    this.router.navigateByUrl('admin/news/' + id);
  }

  createNew() {
    if (this.formGroup.valid) {
      let tosend = new NewsForm();
      tosend.title = this.formGroup.controls['title'].value;
      tosend.description = this.formGroup.controls['description'].value;
      tosend.image = this.formGroup.controls['image'].value;

      this.newsService.createNew(tosend).subscribe((data) => {
        window.location.reload()
      });
    }
  }

  deleteNews(id: number | string) {
    this.newsService.deleteNew(id).subscribe((data) => {
      window.location.reload();
    });
  }
}
