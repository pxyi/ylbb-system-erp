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

@NgModule({
  imports: [
    CommonModule,
    CustomerRoutingModule,
    NgRelaxModule
  ],
  declarations: [PotentialComponent, NewinformationComponent, NointentionComponent, PreviewCustomerComponent, GetMobileDirective, ListComponent, PaycardComponent, AlbumComponent],
  providers: [NewinformationCanDeactivate],
  exports: [ PreviewCustomerComponent, GetMobileDirective ]
})
export class CustomerModule { }
