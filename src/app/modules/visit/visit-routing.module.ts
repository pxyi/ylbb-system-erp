import { MemberComponent } from './member/member.component';
import { NocardComponent } from './nocard/nocard.component';
import { AuthGuardService } from '../../ng-relax/services/auth-guard.service';
import { ClueComponent } from './clue/clue.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreviewCustomerComponent } from 'src/app/modules/customer/preview/preview.component';

const routes: Routes = [
  {
    path: 'clue',
    data: { title: '线索回访' },
    component: ClueComponent,
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
    path: 'nocard',
    data: { title: '未办卡回访' },
    component: NocardComponent,
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
    path: 'member',
    data: { title: '会员回访' },
    component: MemberComponent,
    canActivate: [ AuthGuardService ],
    children: [
      {
        path: 'preview/:id',
        data: { title: '客户详情' },
        component: PreviewCustomerComponent,
        outlet: 'aux'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitRoutingModule { }
