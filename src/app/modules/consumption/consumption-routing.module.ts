import { WelfareComponent } from './welfare/welfare.component';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { RevokeComponent } from './revoke/revoke.component';
import { AuthGuardService } from 'src/app/ng-relax/services/auth-guard.service';
import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShortmsgComponent } from './shortmsg/shortmsg.component';
import { SatisfactionComponent } from './satisfaction/satisfaction.component';

const routes: Routes = [
  {
    path: 'list',
    data: { title: '消费列表' },
    component: ListComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'revoke',
    data: { title: '消费撤销记录' },
    component: RevokeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'shortmsg',
    data: { title: '消费短信记录' },
    component: ShortmsgComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'satisfaction',
    data: { title: '满意度修改记录' },
    component: SatisfactionComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'curriculum',
    data: { title: '会员课程进度' },
    component: CurriculumComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'welfare',
    data: { title: '福利消费列表' },
    component: WelfareComponent,
    canActivate: [ AuthGuardService ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumptionRoutingModule { }
