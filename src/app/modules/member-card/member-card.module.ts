import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberCardRoutingModule } from './member-card-routing.module';
import { ListComponent } from './list/list.component';
import { ChangeLogComponent } from './change-log/change-log.component';
import { PatchLogComponent } from './patch-log/patch-log.component';
import { CardTypeComponent } from './card-type/card-type.component';
import { CardBusinessComponent } from './card-business/card-business.component';
import { NgRelaxModule } from '../../ng-relax/ng-relax.module';

@NgModule({
  imports: [
    CommonModule,
    MemberCardRoutingModule,
    NgRelaxModule
  ],
  declarations: [ListComponent, ChangeLogComponent, PatchLogComponent, CardTypeComponent, CardBusinessComponent]
})
export class MemberCardModule { }
