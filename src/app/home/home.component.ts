import { Component } from '@angular/core';
import { News } from '../_models/news';
import { NewsService } from '../_services/news.service';
import { StatsService } from '../_services/stats.service';
import { Information } from '../_models/information';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  newsList: News[] = []
  stats: Information = new Information()

  constructor(private newsService: NewsService, private statsService: StatsService) {
    this.newsService.getNews().subscribe((data) => {
      this.newsList = data as News[];
    });
    this.statsService.getStats().subscribe((data) => {
      this.stats = data as Information;
    });
  }
}
