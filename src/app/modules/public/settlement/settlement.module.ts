import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettlementComponent } from './settlement.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { MoneyComponent } from './money/money.component';
import { CardComponent } from './card/card.component';
import { CommodityComponent } from './money/commodity/commodity.component';

@NgModule({
  declarations: [SettlementComponent, MoneyComponent, CardComponent, CommodityComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    NgRelaxModule
  ],
  entryComponents: [SettlementComponent, CommodityComponent]
})
export class SettlementModule { }
