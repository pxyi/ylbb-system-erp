import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { ListComponent } from './list/list.component';
import { PreviewComponent } from './list/preview/preview.component';
import { ConsumptionComponent } from './list/consumption/consumption.component';
import { AppointSettingComponent } from './appoint-setting/appoint-setting.component';
import { SwimmerSettingComponent } from './swimmer-setting/swimmer-setting.component';

@NgModule({
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    NgRelaxModule
  ],
  declarations: [ListComponent, PreviewComponent, ConsumptionComponent, AppointSettingComponent, SwimmerSettingComponent],
  entryComponents: [PreviewComponent, ConsumptionComponent]
})
export class AppointmentModule { }
