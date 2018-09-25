import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AuthGuardService } from 'src/app/ng-relax/services/auth-guard.service';

const routes: Routes = [
  {
    path: 'list',
    data: { title: '预约列表' },
    component: ListComponent,
    canActivate: [ AuthGuardService ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
