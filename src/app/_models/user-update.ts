import { Rank } from './rank';

export class UserUpdate {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmed: boolean = false;
  rank: number = 0;
  credit: number = 0;
}
