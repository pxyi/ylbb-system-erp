import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionSalaryComponent } from './positionsalary.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PositionSalaryComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([
      {
        path: '',
        component: PositionSalaryComponent
      }
    ])
  ]
})
export class PositionsalaryModule { }
