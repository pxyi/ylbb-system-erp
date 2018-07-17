import { ConsumptionComponent } from './consumption/consumption.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewinformationCanDeactivate } from 'src/app/modules/customer/newinformation/newinfomation.guard';

const routes: Routes = [
  {
    path: '',
    data: { title: '通卡消费记录', hideTitle: true },
    canDeactivate: [ NewinformationCanDeactivate ],
    component: ConsumptionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasscardRoutingModule { }
