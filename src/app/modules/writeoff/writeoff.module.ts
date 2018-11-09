import { NgRelaxModule } from './../../ng-relax/ng-relax.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WriteoffRoutingModule } from './writeoff-routing.module';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    WriteoffRoutingModule,
    NgRelaxModule
  ],
  declarations: [ListComponent]
})
export class WriteoffModule { }
