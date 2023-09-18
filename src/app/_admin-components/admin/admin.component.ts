import { Component } from '@angular/core';
import { Information } from 'src/app/_models/information';
import { StatsService } from 'src/app/_services/stats.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  stats: Information = new Information();

  constructor(private statsService: StatsService) {
    this.statsService.getStats().subscribe((data) => {
      this.stats = data as Information;
    });
  }
}
