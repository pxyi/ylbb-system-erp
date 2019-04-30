import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { IntegralChangeComponent } from './integral-change.component';

@NgModule({
  declarations: [IntegralChangeComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([{
      path: '',
      component: IntegralChangeComponent
    }])
  ]
})
export class IntegralChangeModule { }
