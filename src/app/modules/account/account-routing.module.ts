import { AuthGuardService } from './../../ng-relax/services/auth-guard.service';
import { ModifyPasswordComponent } from './modify-password/modify-password.component';
import { LoginLogComponent } from './login-log/login-log.component';
import { RoleComponent } from './role/role.component';
import { AccountComponent } from './account/account.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'account',
    data: { title: '账号管理' },
    canActivate: [ AuthGuardService ],
    component: AccountComponent
  },
  {
    path: 'role',
    data: { title: '角色管理' },
    canActivate: [ AuthGuardService ],
    component: RoleComponent
  },
  {
    path: 'loginlog',
    data: { title: '登录日志' },
    canActivate: [ AuthGuardService ],
    component: LoginLogComponent
  },
  {
    path: 'modify',
    data: { title: '修改密码' },
    component: ModifyPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
