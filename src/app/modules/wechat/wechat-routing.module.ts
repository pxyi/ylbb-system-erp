import { SmallProgramComponent } from './small-program/small-program.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../../ng-relax/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    data: { title: '微信小程序', hideTitle: true },
    component: SmallProgramComponent,
    canActivate: [ AuthGuardService ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WechatRoutingModule { }
