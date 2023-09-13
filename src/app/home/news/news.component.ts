import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News } from 'src/app/_models/news';
import { NewsService } from 'src/app/_services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
})
export class NewsComponent {
  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) {}
  itemId: number = 0;
  newsItem: News = new News();

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');
      this.itemId = Number(id);
    });

    this.newsService.getNew(this.itemId).subscribe((data) => {
      this.newsItem = data as News;
    });
  }
}
