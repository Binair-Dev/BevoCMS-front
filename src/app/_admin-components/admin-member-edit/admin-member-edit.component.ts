import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Rank } from 'src/app/_models/rank';
import { User } from 'src/app/_models/user';
import { UserUpdate } from 'src/app/_models/user-update';
import { RankService } from 'src/app/_services/rank.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-admin-member-edit',
  templateUrl: './admin-member-edit.component.html',
})
export class AdminMemberEditComponent {
  id: string = "";
  user: User = new User();
  userFormGroup: FormGroup = new FormGroup({});
  ranks: Rank[] = []

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private rankService: RankService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') as string;
    });

    this.rankService.getRanks().subscribe((data) => {
      this.ranks = data as Rank[];
    });

    this.userService.getUser(this.id).subscribe((data) => {
      this.user = data as User;
    })

    this.userFormGroup = this.fb.group({
      username: ['',[Validators.minLength(3), Validators.maxLength(16)]],
      email: ['', [Validators.email]],
      password: [],
      credit: ['', [Validators.min(0)]],
      rank: [0, [Validators.min(0)]],
      confirmed: [true, [Validators.required]],
    });

    this.userFormGroup.setValue({
      username: this.user.nickname,
      email: this.user.email,
      password: '',
      credit: this.user.credit,
      rank: this.user.rank.id,
      confirmed: this.user.confirmed,
    });
  }

  submit() {
    if(this.userFormGroup.valid) {
      let tosend = new UserUpdate();
      tosend.username = this.userFormGroup.controls['username'].value != '' ? this.userFormGroup.controls['username'].value : this.user.nickname;
      tosend.email =this.userFormGroup.controls['email'].value != '' ? this.userFormGroup.controls['email'].value : this.user.email;
      tosend.password = this.userFormGroup.controls['password'].value;
      tosend.confirmed = this.userFormGroup.controls['confirmed'].value != '' ? this.userFormGroup.controls['confirmed'].value: this.user.confirmed;
      tosend.rank = this.userFormGroup.controls['rank'].value != '' ? this.userFormGroup.controls['rank'].value: this.user.rank.id;
      tosend.credit = this.userFormGroup.controls['credit'].value != '' ? this.userFormGroup.controls['credit'].value: this.user.credit;
      this.userService.updateUser(this.id, tosend).subscribe(
        (data) => {
          if((this.user.id + '') === this.id && this.user.nickname !== tosend.username)
            this.router.navigateByUrl('/logout')
        }
      );
    }
  }
}
