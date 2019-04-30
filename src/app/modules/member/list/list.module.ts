import { ConsumptionModule } from './../../public/consumption/consumption.module';
import { AppointModule } from './../../public/appoint/appoint.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { ChangeComponent } from './change/change.component';
import { ContinuedComponent } from './continued/continued.component';
import { StopComponent } from './stop/stop.component';
import { OpenComponent } from './open/open.component';
import { SupplementComponent } from './supplement/supplement.component';
import { NumberComponent } from './number/number.component';

@NgModule({
  declarations: [ListComponent, ChangeComponent, ContinuedComponent, StopComponent, OpenComponent, SupplementComponent, NumberComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([{
      path: '',
      component: ListComponent
    }]),

    AppointModule,
    ConsumptionModule
  ],
  entryComponents: [ChangeComponent, ContinuedComponent, StopComponent, OpenComponent, SupplementComponent, NumberComponent]
})
export class ListModule { }
