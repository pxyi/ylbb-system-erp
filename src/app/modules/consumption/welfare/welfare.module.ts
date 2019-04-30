import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelfareComponent } from './welfare.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [WelfareComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([{
      path: '',
      component: WelfareComponent
    }])
  ]
})
export class WelfareModule { }
