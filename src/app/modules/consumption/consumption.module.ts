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

@NgModule({
  imports: [
    CommonModule,
    ConsumptionRoutingModule,
    NgRelaxModule
  ],
  declarations: [ListComponent, RevokeComponent, ShortmsgComponent, SatisfactionComponent, CurriculumComponent, WelfareComponent]
})
export class ConsumptionModule { }
