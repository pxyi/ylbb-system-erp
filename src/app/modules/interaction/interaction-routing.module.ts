import { ProposalComponent } from './proposal/proposal.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/ng-relax/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    data: { title: '用户建议' },
    canActivate: [ AuthGuardService ],
    component: ProposalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InteractionRoutingModule { }
