import { NgRelaxModule } from './../../ng-relax/ng-relax.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { RecordComponent } from './record/record.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  imports: [
    CommonModule,
    PaymentRoutingModule,
    NgRelaxModule
  ],
  declarations: [RecordComponent, PaymentComponent]
})
export class PaymentModule { }
