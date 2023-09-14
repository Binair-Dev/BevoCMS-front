import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayComponent } from './user-components/play/play.component';
import { FooterComponent } from './_basic-components/footer/footer.component';
import { HeadComponent } from './_basic-components/head/head.component';
import { HeaderComponent } from './_basic-components/header/header.component';
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
import { CreditComponent } from './user-components/credit/credit.component';
import { ShopItemComponent } from './user-components/shop/shop-item/shop-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { WikiComponent } from './user-components/wiki/wiki.component';
import { JwtInterceptor } from './shared/jwt.interceptor';
import { NewsComponent } from './user-components/home/news/news.component';
import { LogoutComponent } from './user-components/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayComponent,
    FooterComponent,
    HeadComponent,
    HeaderComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
