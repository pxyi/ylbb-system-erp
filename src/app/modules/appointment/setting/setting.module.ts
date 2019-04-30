import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingComponent } from './setting.component';
import { BaseComponent } from './base/base.component';
import { BydayComponent } from './byday/byday.component';
import { ConfigComponent } from './base/config/config.component';
import { ConfigureComponent } from './base/config/configure/configure.component';
import { RuleComponent } from './rule/rule.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [SettingComponent, BaseComponent, BydayComponent, ConfigComponent, ConfigureComponent, RuleComponent,],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SettingComponent
      }
    ]),
    NgRelaxModule,
    NgZorroAntdModule
  ],
  entryComponents: [ConfigComponent, ConfigureComponent]
})
export class SettingModule { }
