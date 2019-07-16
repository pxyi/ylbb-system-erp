import { CardContinuedModule } from './../modules/public/card-continued/card-continued.module';
import { CardOpenModule } from './../modules/public/card-open/card-open.module';
import { CardStopModule } from './../modules/public/card-stop/card-stop.module';
import { CardCreateModule } from './../modules/public/card-create/card-create.module';
import { ConsumptionModule } from './../modules/public/consumption/consumption.module';
import { AppointModule } from './../modules/public/appoint/appoint.module';
import { EsService } from './header/es.service';
import { AppReuseStrategy } from './../core/app-reuse-strategy';
import { NgRelaxModule } from './../ng-relax/ng-relax.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseComponent } from './base.component';
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { MemberComponent } from './header/member/member.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CardChangeModule } from '../modules/public/card-change/card-change.module';
import { BaseRoutingModule } from './base-routing.module'
@NgModule({
  declarations: [BaseComponent, ContentComponent, HeaderComponent, MenuComponent, FooterComponent, MemberComponent],
  imports: [
    CommonModule,
    BaseRoutingModule,
    NgRelaxModule,
    NgZorroAntdModule,

    AppointModule,
    ConsumptionModule,
    CardCreateModule,
    CardChangeModule,
    CardStopModule,
    CardOpenModule,
    CardContinuedModule
  ],
  entryComponents: [MemberComponent],
  providers: [AppReuseStrategy, EsService]
})
export class BaseModule { }
