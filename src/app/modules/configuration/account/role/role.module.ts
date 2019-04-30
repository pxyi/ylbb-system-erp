import { MenuComponent } from './menu/menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleComponent } from './role.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RoleComponent, MenuComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RoleComponent
      }
    ]),
    NgRelaxModule,
    NgZorroAntdModule
  ],
  entryComponents: [MenuComponent]
})
export class RoleModule { }
