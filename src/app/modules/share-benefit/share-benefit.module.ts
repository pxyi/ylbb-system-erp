import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareBenefitRoutingModule } from './share-benefit-routing.module';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    ShareBenefitRoutingModule
  ],
  declarations: [ListComponent]
})
export class ShareBenefitModule { }
