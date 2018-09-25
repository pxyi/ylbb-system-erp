import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { ListComponent } from './list/list.component';
import { PreviewComponent } from './list/preview/preview.component';

@NgModule({
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    NgRelaxModule
  ],
  declarations: [ListComponent, PreviewComponent],
  entryComponents: [PreviewComponent]
})
export class AppointmentModule { }
