import { CardBusinessComponent } from './card-business/card-business.component';
import { CardTypeComponent } from './card-type/card-type.component';
import { PatchLogComponent } from './patch-log/patch-log.component';
import { ChangeLogComponent } from './change-log/change-log.component';
import { AuthGuardService } from 'src/app/ng-relax/services/auth-guard.service';
import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'list',
    data: { title: '会员卡列表' },
    component: ListComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'changelog',
    data: { title: '卡变更日志' },
    component: ChangeLogComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'patchlog',
    data: { title: '补卡日志' },
    component: PatchLogComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'cardtype',
    data: { title: '卡类型管理' },
    component: CardTypeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'cardbusiness',
    data: { title: '卡业务管理' },
    component: CardBusinessComponent,
    canActivate: [ AuthGuardService ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberCardRoutingModule { }
