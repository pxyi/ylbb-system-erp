import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwimmerComponent } from './swimmer.component';
import { BaseComponent } from './base/base.component';
import { BydayComponent } from './byday/byday.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [SwimmerComponent, BaseComponent, BydayComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SwimmerComponent
      }
    ]),
    NgRelaxModule,
    NgZorroAntdModule
  ]
})
export class SwimmerModule { }
