import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortmsgComponent } from './shortmsg.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ShortmsgComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([{
      path: '',
      component: ShortmsgComponent
    }])
  ]
})
export class ShortmsgModule { }
