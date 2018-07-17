import { NgRelaxModule } from '../../ng-relax/ng-relax.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasscardRoutingModule } from './passcard-routing.module';
import { ConsumptionComponent } from './consumption/consumption.component';

@NgModule({
  imports: [
    CommonModule,
    PasscardRoutingModule,
    NgRelaxModule
  ],
  declarations: [ConsumptionComponent]
})
export class PasscardModule { }
