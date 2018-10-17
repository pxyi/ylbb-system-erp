import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberCardRoutingModule } from './member-card-routing.module';
import { ListComponent } from './list/list.component';
import { ChangeLogComponent } from './change-log/change-log.component';
import { PatchLogComponent } from './patch-log/patch-log.component';
import { CardTypeComponent } from './card-type/card-type.component';
import { CardBusinessComponent } from './card-business/card-business.component';
import { NgRelaxModule } from '../../ng-relax/ng-relax.module';
import { AdjustmentComponent } from './list/adjustment/adjustment.component';
import { ChangeComponent } from './list/change/change.component';
import { ContinuedComponent } from './list/continued/continued.component';
import { AddComponent } from './card-type/add/add.component';
import { StopComponent } from './list/stop/stop.component';
import { OpenComponent } from './list/open/open.component';
import { SupplementComponent } from './list/supplement/supplement.component';
import { NumberComponent } from './list/number/number.component';
import { AppointComponent } from './list/appoint/appoint.component';
import { ConsumptionComponent } from './list/consumption/consumption.component';

@NgModule({
  imports: [
    CommonModule,
    MemberCardRoutingModule,
    NgRelaxModule
  ],
  declarations: [ListComponent, ChangeLogComponent, PatchLogComponent, CardTypeComponent, CardBusinessComponent, AdjustmentComponent, ChangeComponent, ContinuedComponent, AddComponent, StopComponent, OpenComponent, SupplementComponent, NumberComponent, AppointComponent, ConsumptionComponent],
  entryComponents: [AdjustmentComponent, ChangeComponent, ContinuedComponent, AddComponent, StopComponent, OpenComponent, SupplementComponent, NumberComponent, AppointComponent, ConsumptionComponent]
})
export class MemberCardModule { }
