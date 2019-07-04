
import { ListComponent } from './list.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { RouterModule } from '@angular/router';
import { AdjustingComponent } from './adjusting/adjusting.component';
import { AdjustmentComponent } from './adjustment/adjustment.component';
import { AppointComponent } from './appoint/appoint.component';
import { ChangeComponent } from './change/change.component';
import { ConsumptionComponent } from './consumption/consumption.component';
import { ContinuedComponent } from './continued/continued.component';
import { NumberComponent } from './number/number.component';
import { OpenComponent } from './open/open.component';
import { StopComponent } from './stop/stop.component';
import { SupplementComponent } from './supplement/supplement.component';
import { WithdrawComponent } from './withdraw/withdraw.component';

@NgModule({
  declarations: [ListComponent, AdjustingComponent, AdjustmentComponent, AppointComponent, ChangeComponent, ConsumptionComponent, ContinuedComponent, NumberComponent, OpenComponent, StopComponent, SupplementComponent, WithdrawComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([{
      path: '',
      component: ListComponent
    }])
  ],
  entryComponents: [AdjustingComponent, AdjustmentComponent, AppointComponent, ChangeComponent, ConsumptionComponent, ContinuedComponent, NumberComponent, OpenComponent, StopComponent, SupplementComponent, WithdrawComponent]
})
export class ListModule { }
