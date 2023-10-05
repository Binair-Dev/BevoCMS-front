import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VoteRewardForm } from '../_models/forms/vote-reward-form';

@Injectable({
  providedIn: 'root',
})
export class VoteRewardService {
  BASE_URL: string = 'http://localhost:8080';

  constructor(private _httpClient: HttpClient) {}

  getVoteRewards() {
    return this._httpClient.get(this.BASE_URL + '/vote-rewards/list');
  }

  getVoteReward(id: number | string) {
    return this._httpClient.get(this.BASE_URL + '/vote-rewards/' + id);
  }

  updateVoteReward(id: number | string, tosend: VoteRewardForm) {
    return this._httpClient.patch(
      this.BASE_URL + '/vote-rewards/update/' + id,
      tosend
    );
  }

  deleteVoteReward(id: number | string) {
    return this._httpClient.delete(this.BASE_URL + '/vote-rewards/delete/' + id);
  }

  createVoteReward(tosend: VoteRewardForm) {
    return this._httpClient.post(this.BASE_URL + '/vote-rewards/create', tosend);
  }
}
