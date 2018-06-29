import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PotentialComponent } from './potential/potential.component';
import { NewinformationComponent } from './newinformation/newinformation.component';
import { NointentionComponent } from './nointention/nointention.component';
import { PreviewCustomerComponent } from './preview/preview.component';

const routes: Routes = [
  {
    path: 'potentail',
    data: { title: '潜在客户' },
    component: PotentialComponent,
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
    component: NewinformationComponent
  },
  {
    path: 'nointention',
    data: { title: '无意向客户' },
    component: NointentionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
