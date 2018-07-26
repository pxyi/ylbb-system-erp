import { NgRelaxModule } from '../../ng-relax/ng-relax.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasscardRoutingModule } from './passcard-routing.module';
import { ConsumptionComponent } from './consumption/consumption.component';
import { PutforwardComponent } from './putforward/putforward.component';

@NgModule({
  imports: [
    CommonModule,
    PasscardRoutingModule,
    NgRelaxModule
  ],
  declarations: [ConsumptionComponent, PutforwardComponent],
  entryComponents: [PutforwardComponent]
})
export class PasscardModule { }
