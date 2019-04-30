import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SatisfactionLogComponent } from './satisfaction-log.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SatisfactionLogComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([{
      path: '',
      component: SatisfactionLogComponent
    }])
  ]
})
export class SatisfactionLogModule { }
