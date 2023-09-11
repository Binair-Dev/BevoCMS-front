import { Component } from '@angular/core';
import { News } from '../_models/news';
import { NewsService } from '../_services/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  newsList: News[] = []

  constructor(private newsService: NewsService) {
    this.newsService.getNews().subscribe((data) => {
      this.newsList = data as News[];
    })
  }
}
