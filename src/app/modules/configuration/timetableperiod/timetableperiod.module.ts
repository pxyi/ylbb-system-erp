import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimetableperiodComponent } from './timetableperiod.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TimetableperiodComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([
      {
        path: '',
        component: TimetableperiodComponent
      }
    ])
  ]
})
export class TimetableperiodModule { }
