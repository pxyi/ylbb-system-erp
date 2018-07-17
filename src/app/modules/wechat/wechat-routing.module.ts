import { SmallProgramComponent } from './small-program/small-program.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewinformationCanDeactivate } from 'src/app/modules/customer/newinformation/newinfomation.guard';

const routes: Routes = [
  {
    path: '',
    data: { title: '微信小程序', hideTitle: true },
    canDeactivate: [ NewinformationCanDeactivate ],
    component: SmallProgramComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WechatRoutingModule { }
