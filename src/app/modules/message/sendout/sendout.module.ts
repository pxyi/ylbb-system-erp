import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendoutComponent } from './sendout.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SendoutComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([{
      path: '',
      component: SendoutComponent
    }])
  ]
})
export class SendoutModule { }
