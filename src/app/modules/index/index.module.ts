import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { AppointDetailComponent } from './appoint-detail/appoint-detail.component';
import { AddapointComponent } from './addapoint/addapoint.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexComponent } from './index.component';
import { ConsumptionComponent } from './appoint-detail/consumption/consumption.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';

@NgModule({
  declarations: [IndexComponent, AddapointComponent, AppointDetailComponent, ConsumptionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: IndexComponent
      }
    ]),
    NgRelaxModule,
    NgZorroAntdModule
  ],
  entryComponents: [AddapointComponent, AppointDetailComponent, ConsumptionComponent]
})
export class IndexModule { }
