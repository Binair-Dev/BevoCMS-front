import { Component } from '@angular/core';
import { Images } from 'src/app/_models/images';
import { Information } from 'src/app/_models/information';
import { ImageService } from 'src/app/_services/image.service';
import { StatsService } from 'src/app/_services/stats.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  stats: Information = new Information();

  constructor(private statsService: StatsService, private imageService: ImageService) {
    this.statsService.getStats().subscribe((data) => {
      this.stats = data as Information;
    });
  }
}
