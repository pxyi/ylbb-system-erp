import { AuthGuardService } from './services/auth-guard.service';
import { RouterModule } from '@angular/router';
import { CacheService } from './services/cache.service';
import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { QueryComponent } from './components/query/query.component';
import { TableComponent } from './components/table/table.component';
import { SlideComponent } from './components/slide/slide.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TipComponent } from './components/tip/tip.component';
import { NoopInterceptor } from '../core/http.intercept';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd';
import zh from '@angular/common/locales/zh';
import { MonthdiffPipe } from './pipes/monthdiff.pipe';
import { QuoteComponent } from './components/quote/quote.component';
import { ListPageComponent } from './components/list-page/list-page.component';
import { HttpService } from './services/http.service';
registerLocaleData(zh);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule
  ],
  declarations: [QueryComponent, TableComponent, SlideComponent, TipComponent, MonthdiffPipe, QuoteComponent, ListPageComponent],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NoopInterceptor,
      multi: true,
    },
    CacheService,
    HttpService,
    MonthdiffPipe,
    AuthGuardService,
  ],
  exports: [
    QueryComponent,
    TableComponent,
    SlideComponent,
    TipComponent,
    QuoteComponent,
    ListPageComponent,

    MonthdiffPipe,

    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule
  ]
})
export class NgRelaxModule { }
