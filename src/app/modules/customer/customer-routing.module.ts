import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PotentialComponent } from './potential/potential.component';
import { NewinformationComponent } from './newinformation/newinformation.component';

const routes: Routes = [
  {
    path: 'potentail',
    data: { title: '潜在客户' },
    component: PotentialComponent
  },
  {
    path: 'newinfo/:id',
    data: { title: '新建潜在客户' },
    component: NewinformationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
