import { NgRelaxModule } from './../../ng-relax/ng-relax.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntegralRoutingModule } from './integral-routing.module';
import { ListComponent } from './list/list.component';
import { ChangeComponent } from './change/change.component';
import { ExchangeComponent } from './exchange/exchange.component';

@NgModule({
  imports: [
    CommonModule,
    IntegralRoutingModule,
    NgRelaxModule
  ],
  declarations: [ListComponent, ChangeComponent, ExchangeComponent]
})
export class IntegralModule { }
