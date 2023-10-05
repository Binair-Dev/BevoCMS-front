import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RankForm } from 'src/app/_models/forms/rank-form';
import { Rank } from 'src/app/_models/rank';
import { RankService } from 'src/app/_services/rank.service';

@Component({
  selector: 'app-admin-rank-edit',
  templateUrl: './admin-rank-edit.component.html',
})
export class AdminRankEditComponent {
  id: string = '';
  rank: Rank = new Rank();
  formGroup: FormGroup = new FormGroup({});

  constructor(
    private route: ActivatedRoute,
    private rankService: RankService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') as string;
    });

    this.formGroup = this.fb.group({
      title: ['', [Validators.minLength(3)]],
      power: ['', [Validators.min(1)]],
    });

    this.rankService.getRank(this.id).subscribe((data) => {
      this.rank = data as Rank;
      this.formGroup.setValue({
        title: this.rank.title,
        power: this.rank.power,
      });
    });
  }

  submit() {
    if (this.formGroup.valid) {
      let tosend = new RankForm();
      tosend.title = this.formGroup.controls['title'].value;
      tosend.power = this.formGroup.controls['power'].value;
      this.rankService.updateRank(this.id, tosend).subscribe((data) => {
        this.router.navigateByUrl("/admin/ranks")
      });
    }
  }
}
