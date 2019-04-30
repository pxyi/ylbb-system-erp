import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommissionComponent } from './commission.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CommissionComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([{
      path: '',
      component: CommissionComponent
    }])
  ]
})
export class CommissionModule { }
