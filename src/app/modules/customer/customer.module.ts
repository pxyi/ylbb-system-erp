import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgRelaxModule } from './../../ng-relax/ng-relax.module';

import { CustomerRoutingModule } from './customer-routing.module';
import { PotentialComponent } from './potential/potential.component';
import { NewinformationComponent } from './newinformation/newinformation.component';
import { NointentionComponent } from './nointention/nointention.component';

@NgModule({
  imports: [
    CommonModule,
    CustomerRoutingModule,
    NgRelaxModule
  ],
  declarations: [PotentialComponent, NewinformationComponent, NointentionComponent]
})
export class CustomerModule { }
