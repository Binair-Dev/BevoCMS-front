import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { get } from 'scriptjs';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
})
export class CreditComponent implements OnInit {
  user: User = new User();

  constructor(private userService: UserService) {
    this.userService.getUser(1).subscribe((data) => {
      this.user = data as User;
    });
  }

  ngOnInit() {
    get('https://api.dedipass.com/v1/pay.js', () => {});
  }
}
