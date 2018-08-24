import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgRelaxModule } from '../../ng-relax/ng-relax.module';

import { CustomerRoutingModule } from './customer-routing.module';
import { PotentialComponent } from './potential/potential.component';
import { NewinformationComponent } from './newinformation/newinformation.component';
import { NointentionComponent } from './nointention/nointention.component';
import { PreviewCustomerComponent } from './preview/preview.component';
import { GetMobileDirective } from './get-mobile.directive';
import { NewinformationCanDeactivate } from './newinformation/newinfomation.guard';
import { ListComponent } from './list/list.component';
import { PaycardComponent } from './paycard/paycard.component';
import { AlbumComponent } from './album/album.component';
import { UpdateComponent } from './list/update/update.component';
import { AppointComponent } from './list/appoint/appoint.component';
import { ConsumptionComponent } from './list/consumption/consumption.component';
import { ConstructionComponent } from './list/construction/construction.component';
import { AddIntegralComponent } from './list/add-integral/add-integral.component';
import { ExchangeComponent } from './list/exchange/exchange.component';

@NgModule({
  imports: [
    CommonModule,
    CustomerRoutingModule,
    NgRelaxModule
  ],
  declarations: [PotentialComponent, NewinformationComponent, NointentionComponent, PreviewCustomerComponent, GetMobileDirective, ListComponent, PaycardComponent, AlbumComponent, UpdateComponent, AppointComponent, ConsumptionComponent, ConstructionComponent, AddIntegralComponent, ExchangeComponent],
  providers: [NewinformationCanDeactivate],
  exports: [ PreviewCustomerComponent, GetMobileDirective ],
  entryComponents: [AppointComponent, ConstructionComponent, ConsumptionComponent, UpdateComponent, AddIntegralComponent, ExchangeComponent]
})
export class CustomerModule { }
