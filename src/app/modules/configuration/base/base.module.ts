import { NgRelaxModule } from './../../../ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseComponent } from './base.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BaseComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    NgRelaxModule,
    RouterModule.forChild([
      {
        path: '',
        component: BaseComponent
      }
    ])
  ]
})
export class BaseModule { }