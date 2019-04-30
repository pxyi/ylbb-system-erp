import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntegralComponent } from './integral.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [IntegralComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([{
      path: '',
      component: IntegralComponent
    }])
  ]
})
export class IntegralModule { }
