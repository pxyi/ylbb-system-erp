import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { ListComponent } from './list/list.component';
import { PreviewComponent } from './list/preview/preview.component';
import { ConsumptionComponent } from './list/consumption/consumption.component';
import { AppointSettingComponent } from './appoint-setting/appoint-setting.component';
import { SwimmerSettingComponent } from './swimmer-setting/swimmer-setting.component';
import { BaseComponent } from './appoint-setting/base/base.component';
import { BydayComponent } from './appoint-setting/byday/byday.component';
import { ConfigComponent } from './appoint-setting/base/config/config.component';
import { ConfigureComponent } from './appoint-setting/base/config/configure/configure.component';
import { RuleComponent } from './appoint-setting/rule/rule.component';
import { SwimBydayComponent } from './swimmer-setting/swim-byday/swim-byday.component';
import { SwimBaseComponent } from './swimmer-setting/swim-base/swim-base.component';

@NgModule({
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    NgRelaxModule
  ],
  declarations: [ListComponent, PreviewComponent, ConsumptionComponent, AppointSettingComponent, SwimmerSettingComponent, BaseComponent, BydayComponent, ConfigComponent, ConfigureComponent, RuleComponent, SwimBydayComponent, SwimBaseComponent],
  entryComponents: [PreviewComponent, ConsumptionComponent, ConfigComponent, ConfigureComponent]
})
export class AppointmentModule { }
