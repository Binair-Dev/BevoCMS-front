import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsForm } from 'src/app/_models/forms/news-form';
import { News } from 'src/app/_models/news';
import { NewsService } from 'src/app/_services/news.service';

@Component({
  selector: 'app-admin-news-edit',
  templateUrl: './admin-news-edit.component.html',
})
export class AdminNewsEditComponent {
  id: string = '';
  news: News = new News();
  formGroup: FormGroup = new FormGroup({});

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') as string;
    });

    this.formGroup = this.fb.group({
      title: ['', [Validators.minLength(3)]],
      description: ['', [Validators.minLength(3)]],
      image: ['', [Validators.minLength(3)]],
    });

    this.newsService.getNew(this.id).subscribe((data) => {
      this.news = data as News;
      this.formGroup.setValue({
        title: this.news.title,
        description: this.news.description,
        image: this.news.image,
      });
    });
  }

  submit() {
    if (this.formGroup.valid) {
      let tosend = new NewsForm();
      tosend.title = this.formGroup.controls['title'].value;
      tosend.description = this.formGroup.controls['description'].value;
      tosend.image = this.formGroup.controls['image'].value;
      this.newsService.updateNew(this.id, tosend).subscribe((data) => {
        this.router.navigateByUrl("/admin/news")
      });
    }
  }
}
