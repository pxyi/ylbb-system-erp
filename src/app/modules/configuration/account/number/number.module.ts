import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { DistributionComponent } from './distribution/distribution.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NumberComponent } from './number.component';

@NgModule({
  declarations: [NumberComponent, DistributionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: NumberComponent
      }
    ]),
    NgRelaxModule,
    NgZorroAntdModule
  ],
  entryComponents: [DistributionComponent]
})
export class NumberModule { }
