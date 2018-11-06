import { PaycardComponent } from './paycard/paycard.component';
import { AuthGuardService } from './../../ng-relax/services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PotentialComponent } from './potential/potential.component';
import { NewinformationComponent } from './newinformation/newinformation.component';
import { NointentionComponent } from './nointention/nointention.component';
import { PreviewCustomerComponent } from './preview/preview.component';
import { NewinformationCanDeactivate } from './newinformation/newinfomation.guard';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: 'list',
    data: { title: '客户列表' },
    component: ListComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'paycard',
    data: { title: '刷卡消费' },
    component: PaycardComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'potential',
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
