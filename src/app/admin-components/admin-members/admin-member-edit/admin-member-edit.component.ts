import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DecodedToken } from 'src/app/_models/decodedToken';
import { Rank } from 'src/app/_models/rank';
import { User } from 'src/app/_models/user';
import { UserForm } from 'src/app/_models/user-form';
import { RankService } from 'src/app/_services/rank.service';
import { TokenDecoderService } from 'src/app/_services/token-decoder.service';
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
  decodedToken: DecodedToken = new DecodedToken()

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private rankService: RankService,
    private router: Router,
    private tokenDecodeService: TokenDecoderService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') as string;
    });

    this.decodedToken = this.tokenDecodeService.getDecodedAccessToken(
      localStorage.getItem('token') as string
    ) as DecodedToken

    this.rankService.getRanks().subscribe((data) => {
      this.ranks = data as Rank[];
    });

    this.userFormGroup = this.fb.group({
      username: ['', [Validators.minLength(3), Validators.maxLength(16)]],
      email: ['', [Validators.email]],
      password: [],
      credit: ['', [Validators.min(0)]],
      rank: [0, [Validators.min(0)]],
      confirmed: [true, [Validators.required]],
    });

    this.userService.getUser(this.id).subscribe((data) => {
      this.user = data as User;
      this.userFormGroup.setValue({
        username: this.user.nickname,
        email: this.user.email,
        password: '',
        credit: this.user.credit,
        rank: this.user.rank.id,
        confirmed: this.user.confirmed,
      });
    })
  }

  submit() {
    if(this.userFormGroup.valid) {
      let tosend = new UserForm();
      tosend.username = this.userFormGroup.controls['username'].value;
      tosend.email =this.userFormGroup.controls['email'].value;
      tosend.password = this.userFormGroup.controls['password'].value;
      tosend.confirmed = this.userFormGroup.controls['confirmed'].value;
      tosend.rank = this.userFormGroup.controls['rank'].value;
      tosend.credit = this.userFormGroup.controls['credit'].value;
      this.userService.updateUser(this.id, tosend).subscribe(
        (data) => {
          if((this.user.id + '') === this.id && this.decodedToken.sub === tosend.username)
            this.router.navigateByUrl('/logout')
          else
            window.location.reload()
        }
      );
    }
  }
}
