import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendlogComponent } from './sendlog.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SendlogComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([{
      path: '',
      component: SendlogComponent
    }])
  ]
})
export class SendlogModule { }
