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
import { CreditComponent } from './user-components/shop/credit/credit.component';
import { authGuard } from './guards/auth.guard';
import { WikiComponent } from './user-components/wiki/wiki.component';
import { NewsComponent } from './user-components/home/news/news.component';
import { LogoutComponent } from './user-components/logout/logout.component';
import { StatusCodeComponent } from './user-components/shop/status-code/status-code.component';
import { adminGuard } from './guards/admin.guard';
import { AdminComponent } from './admin-components/admin/admin.component';
import { AdminMembersComponent } from './admin-components/admin-members/admin-members.component';
import { AdminMemberEditComponent } from './admin-components/admin-members/admin-member-edit/admin-member-edit.component';
import { AdminCategoriesComponent } from './admin-components/admin-categories/admin-categories.component';
import { AdminCategoryEditComponent } from './admin-components/admin-categories/admin-category-edit/admin-category-edit.component';
import { AdminArticlesComponent } from './admin-components/admin-articles/admin-articles.component';
import { AdminArticleEditComponent } from './admin-components/admin-articles/admin-article-edit/admin-article-edit.component';
import { AdminImagesComponent } from './admin-components/admin-images/admin-images.component';
import { AdminNewsComponent } from './admin-components/admin-news/admin-news.component';
import { AdminNewsEditComponent } from './admin-components/admin-news/admin-news-edit/admin-news-edit.component';
import { AdminRankComponent } from './admin-components/admin-rank/admin-rank.component';
import { AdminRankEditComponent } from './admin-components/admin-rank/admin-rank-edit/admin-rank-edit.component';
import { AdminRulesComponent } from './admin-components/admin-rules/admin-rules.component';
import { AdminRulesEditComponent } from './admin-components/admin-rules/admin-rules-edit/admin-rules-edit.component';
import { AdminWikiComponent } from './admin-components/admin-wiki/admin-wiki.component';
import { AdminWikiEditComponent } from './admin-components/admin-wiki/admin-wiki-edit/admin-wiki-edit.component';
import { AdminServerComponent } from './admin-components/admin-server/admin-server.component';
import { AdminServerEditComponent } from './admin-components/admin-server/admin-server-edit/admin-server-edit.component';
import { AdminVoteRewardsComponent } from './admin-components/admin-vote-rewards/admin-vote-rewards.component';
import { AdminVoteRewardsEditComponent } from './admin-components/admin-vote-rewards/admin-vote-rewards-edit/admin-vote-rewards-edit.component';

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
  { path: 'shop-player-history', component: PlayerShopHistoryComponent, canActivate: [authGuard]},
  { path: 'shop-item', component: ShopItemComponent, canActivate: [authGuard] },
  { path: 'credit', component: CreditComponent, canActivate: [authGuard] },
  { path: 'status-code', component: StatusCodeComponent },
  { path: 'admin', component: AdminComponent, canActivate: [adminGuard] },
  { path: 'admin/members', component: AdminMembersComponent, canActivate: [adminGuard]},
  { path: 'admin/member/:id', component: AdminMemberEditComponent, canActivate: [adminGuard]},
  { path: 'admin/categories', component: AdminCategoriesComponent, canActivate: [adminGuard]},
  { path: 'admin/category/:id', component: AdminCategoryEditComponent, canActivate: [adminGuard]},
  { path: 'admin/articles', component: AdminArticlesComponent, canActivate: [adminGuard]},
  { path: 'admin/article/:id', component: AdminArticleEditComponent, canActivate: [adminGuard]},
  { path: 'admin/images', component: AdminImagesComponent, canActivate: [adminGuard]},
  { path: 'admin/news', component: AdminNewsComponent, canActivate: [adminGuard]},
  { path: 'admin/news/:id', component: AdminNewsEditComponent, canActivate: [adminGuard]},
  { path: 'admin/ranks', component: AdminRankComponent, canActivate: [adminGuard]},
  { path: 'admin/ranks/:id', component: AdminRankEditComponent, canActivate: [adminGuard]},
  { path: 'admin/rules', component: AdminRulesComponent, canActivate: [adminGuard]},
  { path: 'admin/rules/:id', component: AdminRulesEditComponent, canActivate: [adminGuard]},
  { path: 'admin/wikis', component: AdminWikiComponent, canActivate: [adminGuard]},
  { path: 'admin/wikis/:id', component: AdminWikiEditComponent, canActivate: [adminGuard]},
  { path: 'admin/servers', component: AdminServerComponent, canActivate: [adminGuard]},
  { path: 'admin/servers/:id', component: AdminServerEditComponent, canActivate: [adminGuard]},
  { path: 'admin/vote-rewards', component: AdminVoteRewardsComponent, canActivate: [adminGuard]},
  { path: 'admin/vote-rewards/:id', component: AdminVoteRewardsEditComponent, canActivate: [adminGuard]},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
