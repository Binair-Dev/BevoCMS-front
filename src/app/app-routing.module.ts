import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayComponent } from './user-components/play/play.component';
import { HomeComponent } from './user-components/home/home.component';
import { VoteComponent } from './user-components/vote/vote.component';
import { ShopComponent } from './user-components/shop/shop.component';
import { CgvComponent } from './user-components/cgv/cgv.component';
import { CguComponent } from './user-components/cgu/cgu.component';
import { MentionsComponent } from './user-components/mentions/mentions.component';
import { ProfileComponent } from './user-components/profile/profile.component';
import { RegisterComponent } from './user-components/register/register.component';
import { LoginComponent } from './user-components/login/login.component';
import { PlayerShopHistoryComponent } from './user-components/profile/player-shop-history/player-shop-history.component';
import { ShopItemComponent } from './user-components/shop/shop-item/shop-item.component';
import { CreditComponent } from './user-components/credit/credit.component';
import { authGuard } from './guards/auth.guard';
import { WikiComponent } from './user-components/wiki/wiki.component';
import { NewsComponent } from './user-components/home/news/news.component';
import { LogoutComponent } from './user-components/logout/logout.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'news/:id', component: NewsComponent },
  { path: 'play', component: PlayComponent },
  { path: 'vote', component: VoteComponent, canActivate: [authGuard] },
  { path: 'shop', component: ShopComponent, canActivate: [authGuard] },
  { path: 'logout', component: LogoutComponent },
  { path: 'shop-item/:id', component: ShopItemComponent, canActivate: [authGuard] },
  { path: 'cgv', component: CgvComponent },
  { path: 'cgu', component: CguComponent },
  { path: 'mentions', component: MentionsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'wiki', component: WikiComponent, canActivate: [authGuard] },
  { path: 'shop-player-history/:id', component: PlayerShopHistoryComponent, canActivate: [authGuard] },
  { path: 'shop-item', component: ShopItemComponent, canActivate: [authGuard] },
  { path: 'credit', component: CreditComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
