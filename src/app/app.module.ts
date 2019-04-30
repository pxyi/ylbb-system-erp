import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './core/app-routing.module';
import { AppComponent } from './core/app.component';
import { NZ_I18N, zh_CN, NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { StoreModule } from '@ngrx/store';
import { reducersConfig } from './core/reducers/reducers-config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { AppReuseStrategy } from './core/app-reuse-strategy';

registerLocaleData(zh);
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducersConfig),
    BrowserAnimationsModule,
    NgZorroAntdModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: RouteReuseStrategy, useClass: AppReuseStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
