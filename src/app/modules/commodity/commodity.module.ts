import { NgRelaxModule } from './../../ng-relax/ng-relax.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommodityRoutingModule } from './commodity-routing.module';
import { ListComponent } from './list/list.component';
import { StockComponent } from './stock/stock.component';
import { LedgerComponent } from './stock/ledger/ledger.component';
import { DailyComponent } from './stock/daily/daily.component';
import { UpdateComponent } from './list/update/update.component';
import { WarehousingComponent } from './list/warehousing/warehousing.component';
import { SelfuseComponent } from './list/selfuse/selfuse.component';

@NgModule({
  imports: [
    CommonModule,
    CommodityRoutingModule,
    NgRelaxModule
  ],
  declarations: [ListComponent, StockComponent, LedgerComponent, DailyComponent, UpdateComponent, WarehousingComponent, SelfuseComponent],
  entryComponents: [UpdateComponent, WarehousingComponent, SelfuseComponent]
})
export class CommodityModule { }
