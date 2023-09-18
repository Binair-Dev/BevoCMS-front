import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-admin-members',
  templateUrl: './admin-members.component.html',
})
export class AdminMembersComponent {
  members: User[] = [];
  page: number = 0;

  constructor(private userService: UserService, private router: Router) {
    this.userService.getUsersFromTo(this.page, 20).subscribe((data) => {
      this.members = data as User[];
    });
  }

  next() {
    this.page++;
    this.userService.getUsersFromTo(this.page, 20).subscribe((data) => {
      this.members = data as User[];
    });
  }

  previous() {
    if (this.page > 0) this.page--;
    this.userService.getUsersFromTo(this.page, 20).subscribe((data) => {
      this.members = data as User[];
    });
  }

  editUser(id: number | string) {
    this.router.navigateByUrl('admin/member/' + id);
  }
}
