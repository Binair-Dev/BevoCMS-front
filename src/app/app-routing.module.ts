import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayComponent } from './play/play.component';
import { HomeComponent } from './home/home.component';
import { VoteComponent } from './vote/vote.component';
import { ShopComponent } from './shop/shop.component';
import { CgvComponent } from './cgv/cgv.component';
import { CguComponent } from './cgu/cgu.component';
import { MentionsComponent } from './mentions/mentions.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PlayerShopHistoryComponent } from './profile/player-shop-history/player-shop-history.component';
import { ShopItemComponent } from './shop/shop-item/shop-item.component';
import { CreditComponent } from './credit/credit.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'play', component: PlayComponent },
  { path: 'vote', component: VoteComponent, canActivate: [authGuard] },
  { path: 'shop', component: ShopComponent, canActivate: [authGuard] },
  { path: 'cgv', component: CgvComponent },
  { path: 'cgu', component: CguComponent },
  { path: 'mentions', component: MentionsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  {
    path: 'shop-player-history',
    component: PlayerShopHistoryComponent,
    canActivate: [authGuard],
  },
  { path: 'shop-item', component: ShopItemComponent, canActivate: [authGuard] },
  { path: 'credit', component: CreditComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
