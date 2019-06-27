import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderComponent } from './order.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';

import { PreviewComponent } from './preview/preview.component';
import { SatisfactionComponent } from './satisfaction/satisfaction.component';
import { RevokeComponent } from './revoke/revoke.component';
import { MessageComponent } from './message/message.component';
import { CurriculumComponent } from './curriculum/curriculum.component';

@NgModule({
  declarations: [OrderComponent, PreviewComponent, SatisfactionComponent, RevokeComponent, MessageComponent, CurriculumComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([{
      path: '',
      component : OrderComponent
    }]),
  ],
  entryComponents: [PreviewComponent, SatisfactionComponent, RevokeComponent, MessageComponent, CurriculumComponent]
})
export class OrderModule { }
