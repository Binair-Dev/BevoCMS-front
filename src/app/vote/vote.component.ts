import { Component } from '@angular/core';
import { VoteService } from '../_services/vote.service';
import { Vote } from '../_models/vote';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
})
export class VoteComponent {
  voteList: Vote[] = [];

  constructor(private voteService: VoteService) {
    this.voteService.getVotes().subscribe((data) => {
      this.voteList = data as Vote[];
    });
  }
}
