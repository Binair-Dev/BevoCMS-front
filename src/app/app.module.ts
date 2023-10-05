import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayComponent } from './user-components/play/play.component';
import { FooterComponent } from './user-components/_basic-components/footer/footer.component';
import { HeadComponent } from './user-components/_basic-components/head/head.component';
import { HomeComponent } from './user-components/home/home.component';
import { VoteComponent } from './user-components/vote/vote.component';
import { ShopComponent } from './user-components/shop/shop.component';
import { CguComponent } from './user-components/cgu/cgu.component';
import { CgvComponent } from './user-components/cgv/cgv.component';
import { MentionsComponent } from './user-components/mentions/mentions.component';
import { LoginComponent } from './user-components/login/login.component';
import { RegisterComponent } from './user-components/register/register.component';
import { ProfileComponent } from './user-components/profile/profile.component';
import { PlayerShopHistoryComponent } from './user-components/profile/player-shop-history/player-shop-history.component';
import { CreditComponent } from './user-components/shop/credit/credit.component';
import { ShopItemComponent } from './user-components/shop/shop-item/shop-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { WikiComponent } from './user-components/wiki/wiki.component';
import { JwtInterceptor } from './shared/jwt.interceptor';
import { NewsComponent } from './user-components/home/news/news.component';
import { LogoutComponent } from './user-components/logout/logout.component';
import { StatusCodeComponent } from './user-components/shop/status-code/status-code.component';
import { AdminComponent } from './admin-components/admin/admin.component';
import { AdminFooterComponent } from './admin-components/_basic-components/admin-footer/admin-footer.component';
import { AdminHeadComponent } from './admin-components/_basic-components/admin-head/admin-head.component';
import { AdminMemberEditComponent } from './admin-components/admin-members/admin-member-edit/admin-member-edit.component';
import { AdminMembersComponent } from './admin-components/admin-members/admin-members.component';
import { AdminSidebarComponent } from './admin-components/_basic-components/admin-sidebar/admin-sidebar.component';
import { NavComponent } from './user-components/_basic-components/nav/nav.component';
import { AdminCategoriesComponent } from './admin-components/admin-categories/admin-categories.component';
import { AdminCategoryEditComponent } from './admin-components/admin-categories/admin-category-edit/admin-category-edit.component';
import { AdminArticlesComponent } from './admin-components/admin-articles/admin-articles.component';
import { AdminArticleEditComponent } from './admin-components/admin-articles/admin-article-edit/admin-article-edit.component';
import { AdminImagesComponent } from './admin-components/admin-images/admin-images.component';
import { AdminNavComponent } from './admin-components/_basic-components/admin-nav/admin-nav.component';
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

@NgModule({
  declarations: [
    AppComponent,
    PlayComponent,
    FooterComponent,
    HeadComponent,
    NavComponent,
    HomeComponent,
    VoteComponent,
    ShopComponent,
    CguComponent,
    CgvComponent,
    MentionsComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    PlayerShopHistoryComponent,
    CreditComponent,
    ShopItemComponent,
    WikiComponent,
    NewsComponent,
    LogoutComponent,
    StatusCodeComponent,
    AdminComponent,
    AdminHeadComponent,
    AdminFooterComponent,
    AdminNavComponent,
    AdminMembersComponent,
    AdminMemberEditComponent,
    AdminSidebarComponent,
    AdminCategoriesComponent,
    AdminCategoryEditComponent,
    AdminArticlesComponent,
    AdminArticleEditComponent,
    AdminImagesComponent,
    AdminNewsComponent,
    AdminNewsEditComponent,
    AdminRankComponent,
    AdminRankEditComponent,
    AdminRulesComponent,
    AdminRulesEditComponent,
    AdminWikiComponent,
    AdminWikiEditComponent,
    AdminServerComponent,
    AdminServerEditComponent,
    AdminVoteRewardsComponent,
    AdminVoteRewardsEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
