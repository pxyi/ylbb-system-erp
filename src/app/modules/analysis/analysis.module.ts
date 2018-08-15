import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalysisRoutingModule } from './analysis-routing.module';
import { AnalysisComponent } from './analysis.component';
import { NgRelaxModule } from '../../ng-relax/ng-relax.module';

@NgModule({
  imports: [
    CommonModule,
    AnalysisRoutingModule,
    NgRelaxModule
  ],
  declarations: [AnalysisComponent]
})
export class AnalysisModule { }
