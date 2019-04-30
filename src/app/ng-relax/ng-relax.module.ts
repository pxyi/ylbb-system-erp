import { AliOssClientService } from './services/alioss-client.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NoopInterceptor } from '../core/http.intercept';
import { HttpService } from './services/http.service';
import { QueryComponent } from './components/query/query.component';
import { TableComponent } from './components/table/table.component';
import { SlideComponent } from './components/slide/slide.component';
import { TipComponent } from './components/tip/tip.component';
import { QuoteComponent } from './components/quote/quote.component';
import { ListPageComponent } from './components/list-page/list-page.component';
import { ListPageSimpComponent } from './components/list-page-simp/list-page.component';
import { QuerySimpComponent } from './components/query-simp/query-simp.component';
import { UploadPictureComponent } from './components/upload-picture/upload-picture.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { TitleComponent } from './components/title/title.component';
import { MonthdiffPipe } from './pipes/monthdiff.pipe';
import { MathPipe } from './pipes/math.pipe';
import { CacheService } from './services/cache.service';
import { AuthGuardService } from './services/auth-guard.service';
import { GetMobileDirective } from './directives/get-mobile.directive';


@NgModule({
  declarations: [QueryComponent, TableComponent, SlideComponent, TipComponent, QuoteComponent, ListPageComponent, ListPageSimpComponent, QuerySimpComponent, UploadPictureComponent, DrawerComponent, TitleComponent, MonthdiffPipe, MathPipe, GetMobileDirective],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule
  ],
  exports: [
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    
    QueryComponent,
    TableComponent,
    SlideComponent,
    TipComponent,
    QuoteComponent,
    ListPageComponent,
    ListPageSimpComponent,
    QuerySimpComponent,
    UploadPictureComponent,
    DrawerComponent,
    TitleComponent,

    GetMobileDirective,

    MonthdiffPipe,
    MathPipe
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
    HttpService,
    CacheService,
    MonthdiffPipe,
    AuthGuardService,
    AliOssClientService
  ]
})
export class NgRelaxModule { }
