import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgRelaxModule } from './ng-relax/ng-relax.module';
import { FooterComponent } from './base/footer/footer.component';
import { ContentComponent } from './base/content/content.component';
import { HeaderComponent } from './base/header/header.component';
import { BaseComponent } from './base/base.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './core/app-routing.module';
import { AppComponent } from './core/app.component';
import { LoginComponent } from './core/login/login.component';
import { MenuComponent } from './base/menu/menu.component';
import { StoreModule } from '@ngrx/store';
import { reducersConfig } from './core/reducers/reducers-config';
import { BreadcrumbComponent } from './base/content/breadcrumb/breadcrumb.component';
import { UserInfoResolver } from './core/userInfo-resolver.service';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BaseComponent,
    HeaderComponent,
    MenuComponent,
    ContentComponent,
    FooterComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgRelaxModule,
    StoreModule.forRoot(reducersConfig)
  ],
  providers: [
    UserInfoResolver,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
