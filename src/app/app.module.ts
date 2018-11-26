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
import { LocationStrategy, HashLocationStrategy, registerLocaleData } from '@angular/common';
import { HomeComponent } from './base/home/home.component';
import { AddapointComponent } from './base/home/addapoint/addapoint.component';
import { AppointDetailComponent } from './base/home/appoint-detail/appoint-detail.component';
import { ConsumptionComponent } from './base/home/appoint-detail/consumption/consumption.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BaseComponent,
    HeaderComponent,
    MenuComponent,
    ContentComponent,
    FooterComponent,
    BreadcrumbComponent,
    HomeComponent,
    AddapointComponent,
    AppointDetailComponent,
    ConsumptionComponent
  ],
  entryComponents: [AddapointComponent, AppointDetailComponent, ConsumptionComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgRelaxModule,
    StoreModule.forRoot(reducersConfig),
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule
  ],
  providers: [
    UserInfoResolver,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: NZ_I18N, useValue: zh_CN },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
