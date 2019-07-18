import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticComponent } from '../statistic/statistic.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { ViserModule } from 'viser-ng';
import { TodayComponent } from './today/today.component';
import { SaleComponent } from './sale/sale.component';
import { StaffComponent } from './staff/staff.component';
import { KanbanComponent } from './sale/kanban/kanban.component';
import { SourceComponent } from './sale/source/source.component';

@NgModule({
  declarations: [StatisticComponent, TodayComponent, SaleComponent, StaffComponent, KanbanComponent, SourceComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([
      {
        path: '',
        component: StatisticComponent
      }
    ]),
    ViserModule
  ]
})
export class StatisticModule { }
