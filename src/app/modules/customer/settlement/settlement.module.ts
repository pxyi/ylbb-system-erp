import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettlementComponent } from './settlement.component';
import { RouterModule } from '@angular/router';
import { ConsumptionsComponents } from './consumptions/consumptions.component';
import { UpclassComponent } from './upclass/upclass.component';

@NgModule({
  declarations: [SettlementComponent, ConsumptionsComponents, UpclassComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    NgRelaxModule,
    RouterModule.forChild([{
      path: '',
      component: SettlementComponent
    }])
  ],
  entryComponents: [ConsumptionsComponents, UpclassComponent]
})
export class SettlementModule { }
