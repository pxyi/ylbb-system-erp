import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SatisfactionComponent } from './satisfaction.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SatisfactionComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    NgRelaxModule,
    RouterModule.forChild([{
      path: '',
      component: SatisfactionComponent
    }])
  ]
})
export class SatisfactionModule { }
