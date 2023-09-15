import { Rank } from "./rank";

export class User {
  id: number = 0;
  nickname: string = '';
  email: string = '';
  confirmed: boolean = false;
  rank: Rank = new Rank();
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  credit: number = 0;
}
