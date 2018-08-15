import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../../ng-relax/services/auth-guard.service';
import { ChangeComponent } from './change/change.component';
import { ExchangeComponent } from './exchange/exchange.component';

const routes: Routes = [
  {
    path: 'list',
    data: { title: '会员积分列表' },
    component: ListComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change',
    data: { title: '积分变更日志' },
    component: ChangeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'exchange',
    data: { title: '积分兑换日志' },
    component: ExchangeComponent,
    canActivate: [ AuthGuardService ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntegralRoutingModule { }
