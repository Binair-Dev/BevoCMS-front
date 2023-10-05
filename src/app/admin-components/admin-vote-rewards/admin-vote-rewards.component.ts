import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VoteRewardForm } from 'src/app/_models/forms/vote-reward-form';
import { Server } from 'src/app/_models/server';
import { VoteReward } from 'src/app/_models/vote-reward';
import { ServerService } from 'src/app/_services/server.service';
import { VoteRewardService } from 'src/app/_services/vote-reward.service';

@Component({
  selector: 'app-admin-vote-rewards',
  templateUrl: './admin-vote-rewards.component.html',
})
export class AdminVoteRewardsComponent {
  formGroup: FormGroup = new FormGroup({});
  voteRewards: VoteReward[] = [];
  page: number = 0;
  servers: Server[] = [];

  constructor(
    private voteRewardService: VoteRewardService,
    private serverService: ServerService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      title: ['', [Validators.minLength(3)]],
      percent: ['', [Validators.min(1)]],
      rewardType: ['', [Validators.minLength(3)]],
      command: [''],
      credit: [0],
      server: ['', [Validators.min(1)]],
    });
  }

  ngOnInit(): void {
     this.serverService.getServers().subscribe((data) => {
       this.servers = data as Server[];
     });
     this.voteRewardService.getVoteRewards().subscribe((data) => {
       this.voteRewards = data as VoteReward[];
     });
  }

  editVoteReward(id: number | string) {
    this.router.navigateByUrl('admin/vote-rewards/' + id);
  }

  createVoteReward() {
    console.log(this.formGroup.controls);

    if (this.formGroup.valid) {
      let tosend = new VoteRewardForm();
      tosend.title = this.formGroup.controls['title'].value;
      tosend.percent = this.formGroup.controls['percent'].value;
      tosend.rewardType = this.formGroup.controls['rewardType'].value;
      tosend.command = this.formGroup.controls['command'].value;
      tosend.credit = this.formGroup.controls['credit'].value;
      tosend.server = this.formGroup.controls['server'].value as number;

      this.voteRewardService.createVoteReward(tosend).subscribe((data) => {
        window.location.reload();
      });
    }
  }

  deleteVoteReward(id: number | string) {
    this.voteRewardService.deleteVoteReward(id).subscribe((data) => {
      window.location.reload();
    });
  }
}
