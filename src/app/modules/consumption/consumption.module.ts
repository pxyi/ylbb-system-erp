import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsumptionRoutingModule } from './consumption-routing.module';
import { ListComponent } from './list/list.component';
import { RevokeComponent } from './revoke/revoke.component';
import { ShortmsgComponent } from './shortmsg/shortmsg.component';
import { SatisfactionComponent } from './satisfaction/satisfaction.component';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { WelfareComponent } from './welfare/welfare.component';
import { NgRelaxModule } from '../../ng-relax/ng-relax.module';
import { PreviewComponent } from './list/preview/preview.component';
import { MessageComponent } from './list/message/message.component';
import { UpdateSatisfactionComponent } from './list/satisfaction/satisfaction.component';
import { UpdateRevokeComponent } from './list/revoke/revoke.component';
import { UpdateCurriculumComponent } from './list/curriculum/curriculum.component';

@NgModule({
  imports: [
    CommonModule,
    ConsumptionRoutingModule,
    NgRelaxModule
  ],
  declarations: [ListComponent, RevokeComponent, ShortmsgComponent, SatisfactionComponent, CurriculumComponent, WelfareComponent, PreviewComponent, MessageComponent, UpdateSatisfactionComponent, UpdateRevokeComponent, UpdateCurriculumComponent],
  entryComponents: [UpdateRevokeComponent, UpdateSatisfactionComponent, UpdateCurriculumComponent, PreviewComponent, MessageComponent]
})
export class ConsumptionModule { }
