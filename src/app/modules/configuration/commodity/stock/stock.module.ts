import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockComponent } from './stock.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { DailyComponent } from './daily/daily.component';
import { LedgerComponent } from './ledger/ledger.component';

@NgModule({
  declarations: [StockComponent, DailyComponent, LedgerComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([
      {
        path: '',
        component: StockComponent
      }
    ]),
  ]
})
export class StockModule { }
