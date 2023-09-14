import { Component } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  user: User = new User();

  constructor(private userService: UserService) {
    this.userService.getUser(1).subscribe((data) => {
      this.user = data as User;
    });
  }
}
