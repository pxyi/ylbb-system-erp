import { UserInfoResolver } from './../base/userInfo-resolver.service';
import { BaseComponent } from './../base/base.component';
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
        loadChildren: 'src/app/modules/customer/customer.module#CustomerModule'
      },
      {
        path: 'wechat',
        data: { title: '微信' },
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
