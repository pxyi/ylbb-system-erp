import { AuthGuardService } from '../ng-relax/services/auth-guard.service';
import { UserInfoResolver } from './userInfo-resolver.service';
import { BaseComponent } from '../base/base.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: BaseComponent,
    resolve: { userInfo: UserInfoResolver },
    children: [
      {
        path: 'customer',
        data: { title: '客户管理' },
        canLoad: [ AuthGuardService ],
        loadChildren: 'src/app/modules/customer/customer.module#CustomerModule'
      },
      {
        path: 'account',
        data: { title: '账户管理' },
        canLoad: [ AuthGuardService ],
        loadChildren: 'src/app/modules/account/account.module#AccountModule'
      },
      {
        path: 'passcard',
        data: { title: '全国通卡' },
        canLoad: [ AuthGuardService ],
        loadChildren: 'src/app/modules/passcard/passcard.module#PasscardModule'
      },
      {
        path: 'interaction',
        data: { title: '用户互动' },
        canLoad: [ AuthGuardService ],
        loadChildren: 'src/app/modules/interaction/interaction.module#InteractionModule'
      },
      {
        path: 'wechat',
        data: { title: '微信' },
        canLoad: [ AuthGuardService ],
        loadChildren: 'src/app/modules/wechat/wechat.module#WechatModule'
      }
    ]
  },
  {
    path: 'system',
    data: { title: '系统管理' },
    loadChildren: 'src/app/modules/system/system.module#SystemModule'
  },
  {
    path: '**',
    redirectTo: '/system/error/404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
