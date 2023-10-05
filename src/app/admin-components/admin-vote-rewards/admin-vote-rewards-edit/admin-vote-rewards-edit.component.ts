import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VoteRewardForm } from 'src/app/_models/forms/vote-reward-form';
import { Server } from 'src/app/_models/server';
import { VoteReward } from 'src/app/_models/vote-reward';
import { ServerService } from 'src/app/_services/server.service';
import { VoteRewardService } from 'src/app/_services/vote-reward.service';

@Component({
  selector: 'app-admin-vote-rewards-edit',
  templateUrl: './admin-vote-rewards-edit.component.html',
})
export class AdminVoteRewardsEditComponent {
  id: string = '';
  voteReward: VoteReward = new VoteReward();
  formGroup: FormGroup = new FormGroup({});
  servers: Server[] = []

  constructor(
    private route: ActivatedRoute,
    private voteRewardService: VoteRewardService,
    private serverService: ServerService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') as string;
    });

    this.formGroup = this.fb.group({
      title: ['', [Validators.minLength(3)]],
      percent: ['', [Validators.min(1)]],
      rewardType: ['', [Validators.minLength(3)]],
      command: [''],
      credit: [0],
      server: [0, [Validators.min(1)]],
    });

    this.serverService.getServers().subscribe((data) => {
      this.servers = data as Server[]
      this.voteRewardService.getVoteReward(this.id).subscribe((data) => {
        this.voteReward = data as VoteReward;
        this.formGroup.setValue({
          title: this.voteReward.title,
          percent: this.voteReward.percent,
          rewardType: this.voteReward.rewardType,
          command: this.voteReward.command,
          credit: this.voteReward.credit,
          server: this.voteReward.server,
        });
      });
    })
  }

  submit() {
    if (this.formGroup.valid) {
      let tosend = new VoteRewardForm();
      tosend.title = this.formGroup.controls['title'].value;
      tosend.percent = this.formGroup.controls['percent'].value;
      tosend.rewardType = this.formGroup.controls['rewardType'].value;
      tosend.command = this.formGroup.controls['command'].value;
      tosend.credit = this.formGroup.controls['credit'].value;
      tosend.server = this.formGroup.controls['server'].value as number;
      this.voteRewardService.updateVoteReward(this.id, tosend).subscribe((data) => {
        this.router.navigateByUrl('/admin/vote-rewards');
      });
    }
  }
}
