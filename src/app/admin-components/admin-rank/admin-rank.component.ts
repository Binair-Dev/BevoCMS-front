import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RankForm } from 'src/app/_models/forms/rank-form';
import { Rank } from 'src/app/_models/rank';
import { RankService } from 'src/app/_services/rank.service';

@Component({
  selector: 'app-admin-rank',
  templateUrl: './admin-rank.component.html',
})
export class AdminRankComponent {
  formGroup: FormGroup = new FormGroup({});
  rank: Rank[] = [];
  page: number = 0;

  constructor(
    private rankService: RankService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      title: ['', [Validators.minLength(3)]],
      power: ['', [Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.rankService.getRanks().subscribe((data) => {
      this.rank = data as Rank[];
    });
  }

  editRank(id: number | string) {
    this.router.navigateByUrl('admin/ranks/' + id);
  }

  createRank() {
    if (this.formGroup.valid) {
      let tosend = new RankForm();
      tosend.title = this.formGroup.controls['title'].value;
      tosend.power = this.formGroup.controls['power'].value;

      this.rankService.createRank(tosend).subscribe((data) => {
        window.location.reload();
      });
    }
  }

  deleteRank(id: number | string) {
    this.rankService.deleteRank(id).subscribe((data) => {
      window.location.reload();
    });
  }
}
