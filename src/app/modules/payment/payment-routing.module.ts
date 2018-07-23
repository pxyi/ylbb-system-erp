import { RecordComponent } from './record/record.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { AuthGuardService } from 'src/app/ng-relax/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    data: { title: '在线充值' },
    component: PaymentComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'record',
    data: { title: '支付记录' },
    component: RecordComponent,
    canActivate: [ AuthGuardService ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
