import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PayApplyComponent } from './pay-apply.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [PayApplyComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    RouterModule.forChild([
      {
        path: '',
        component : PayApplyComponent
      }
    ])
  ]
})
export class PayApplyModule { }
