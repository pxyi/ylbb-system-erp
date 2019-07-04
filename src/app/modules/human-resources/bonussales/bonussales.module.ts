import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BonusSalesComponent } from './bonussales.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BonusSalesComponent],
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
