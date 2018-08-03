import { AuthGuardService } from 'src/app/ng-relax/services/auth-guard.service';
import { ActivityComponent } from './activity/activity.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: { title: '参加活动' },
    component: ActivityComponent,
    canActivate: [ AuthGuardService ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketingRoutingModule { }
