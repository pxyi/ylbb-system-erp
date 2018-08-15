import { TemplateComponent } from './template/template.component';
import { AuthGuardService } from './../../ng-relax/services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendoutComponent } from './sendout/sendout.component';
import { SendlogComponent } from './sendlog/sendlog.component';

const routes: Routes = [
  {
    path: 'sendout',
    data: { title: '消息发送' },
    component: SendoutComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'template',
    data: { title: '模板配置' },
    component: TemplateComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'sendlog',
    data: { title: '消息发送日志' },
    component: SendlogComponent,
    canActivate: [ AuthGuardService ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule { }
