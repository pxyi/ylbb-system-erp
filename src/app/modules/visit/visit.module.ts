import { CustomerModule } from './../customer/customer.module';
import { NgRelaxModule } from '../../ng-relax/ng-relax.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitRoutingModule } from './visit-routing.module';
import { ClueComponent } from './clue/clue.component';
import { NocardComponent } from './nocard/nocard.component';
import { MemberComponent } from './member/member.component';

@NgModule({
  imports: [
    CommonModule,
    VisitRoutingModule,
    NgRelaxModule,
    CustomerModule
  ],
  declarations: [ClueComponent, NocardComponent, MemberComponent]
})
export class VisitModule { }
