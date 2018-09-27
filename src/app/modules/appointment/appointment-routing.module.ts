import { AppointSettingComponent } from './appoint-setting/appoint-setting.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AuthGuardService } from 'src/app/ng-relax/services/auth-guard.service';
import { SwimmerSettingComponent } from './swimmer-setting/swimmer-setting.component';

const routes: Routes = [
  {
    path: 'list',
    data: { title: '预约列表' },
    component: ListComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'setting',
    data: { title: '预约设置', hideTitle: true },
    component: AppointSettingComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'swimmer',
    data: { title: '泳师设置', hideTitle: true },
    component: SwimmerSettingComponent,
    canActivate: [ AuthGuardService ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
