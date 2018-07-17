import { ProposalComponent } from './proposal/proposal.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewinformationCanDeactivate } from 'src/app/modules/customer/newinformation/newinfomation.guard';

const routes: Routes = [
  {
    path: '',
    data: { title: '用户建议' },
    canDeactivate: [ NewinformationCanDeactivate ],
    component: ProposalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InteractionRoutingModule { }
