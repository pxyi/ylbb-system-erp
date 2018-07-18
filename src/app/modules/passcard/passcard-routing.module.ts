import { ConsumptionComponent } from './consumption/consumption.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../../ng-relax/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    data: { title: '通卡消费记录', hideTitle: true },
    component: ConsumptionComponent,
    canActivate: [ AuthGuardService ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasscardRoutingModule { }
