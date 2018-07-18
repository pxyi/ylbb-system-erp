import { AuthGuardService } from './../../ng-relax/services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PotentialComponent } from './potential/potential.component';
import { NewinformationComponent } from './newinformation/newinformation.component';
import { NointentionComponent } from './nointention/nointention.component';
import { PreviewCustomerComponent } from './preview/preview.component';
import { NewinformationCanDeactivate } from './newinformation/newinfomation.guard';

const routes: Routes = [
  {
    path: 'potentail',
    data: { title: '潜在客户' },
    component: PotentialComponent,
    canActivate: [ AuthGuardService ],
    children: [
      {
        path: 'preview/:id',
        data: { title: '客户详情' },
        component: PreviewCustomerComponent,
        outlet: 'aux'
      }
    ]
  },
  {
    path: 'newinfo/:id',
    data: { title: '新建潜在客户' },
    component: NewinformationComponent,
    canActivate: [ AuthGuardService ],
    canDeactivate: [ NewinformationCanDeactivate ]
  },
  {
    path: 'nointention',
    data: { title: '无意向客户' },
    component: NointentionComponent,
    canActivate: [ AuthGuardService ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
