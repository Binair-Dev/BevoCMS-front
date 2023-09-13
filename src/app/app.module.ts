import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayComponent } from './play/play.component';
import { FooterComponent } from './_basic-components/footer/footer.component';
import { HeadComponent } from './_basic-components/head/head.component';
import { HeaderComponent } from './_basic-components/header/header.component';
import { HomeComponent } from './home/home.component';
import { VoteComponent } from './vote/vote.component';
import { ShopComponent } from './shop/shop.component';
import { CguComponent } from './cgu/cgu.component';
import { CgvComponent } from './cgv/cgv.component';
import { MentionsComponent } from './mentions/mentions.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { PlayerShopHistoryComponent } from './profile/player-shop-history/player-shop-history.component';
import { CreditComponent } from './credit/credit.component';
import { ShopItemComponent } from './shop/shop-item/shop-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { WikiComponent } from './wiki/wiki.component';
import { JwtInterceptor } from './shared/jwt.interceptor';
import { NewsComponent } from './home/news/news.component';
import { LogoutComponent } from './logout/logout.component';

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
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
