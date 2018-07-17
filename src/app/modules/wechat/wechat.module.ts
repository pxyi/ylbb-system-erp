import { NgRelaxModule } from '../../ng-relax/ng-relax.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbmModule } from 'angular-baidu-maps';

import { WechatRoutingModule } from './wechat-routing.module';
import { SmallProgramComponent } from './small-program/small-program.component';
import { PreviewComponent } from './preview/preview.component';

@NgModule({
  imports: [
    CommonModule,
    WechatRoutingModule,
    NgRelaxModule,
    AbmModule.forRoot({
      apiKey: '7NCxWo3ADYmuEiFY8GM4SW9yxoNGSnLG'
    })
  ],
  declarations: [SmallProgramComponent, PreviewComponent],
  entryComponents: [PreviewComponent]
})
export class WechatModule { }
