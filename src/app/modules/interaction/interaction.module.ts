import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InteractionRoutingModule } from './interaction-routing.module';
import { ProposalComponent } from './proposal/proposal.component';
import { NgRelaxModule } from '../../ng-relax/ng-relax.module';
import { PreviewComponent } from './preview/preview.component';

@NgModule({
  imports: [
    CommonModule,
    InteractionRoutingModule,
    NgRelaxModule
  ],
  declarations: [ProposalComponent, PreviewComponent],
  entryComponents: [PreviewComponent]
})
export class InteractionModule { }
