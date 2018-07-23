import { NgRelaxModule } from '../../ng-relax/ng-relax.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account/account.component';
import { RoleComponent } from './role/role.component';
import { LoginLogComponent } from './login-log/login-log.component';
import { ModifyPasswordComponent } from './modify-password/modify-password.component';
import { MenuComponent } from './role/menu/menu.component';
import { DistributionComponent } from './account/distribution/distribution.component';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    NgRelaxModule
  ],
  declarations: [AccountComponent, RoleComponent, LoginLogComponent, ModifyPasswordComponent, MenuComponent, DistributionComponent],
  entryComponents: [MenuComponent, DistributionComponent]
})
export class AccountModule { }
