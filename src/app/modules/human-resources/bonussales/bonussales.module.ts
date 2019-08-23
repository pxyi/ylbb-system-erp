import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BonusSalesComponent } from './bonussales.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { Update1Component } from './update1/update1.component';
import { Update2Component } from './update2/update2.component';

@NgModule({
  declarations: [BonusSalesComponent, Update1Component, Update2Component],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([
      {
        path: '',
        component: BonusSalesComponent
      }
    ])
  ]
})
export class BonussalesModule { }
