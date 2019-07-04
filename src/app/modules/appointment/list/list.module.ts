import { ConsumptionModule } from './../../public/consumption/consumption.module';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './list.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { PreviewComponent } from './preview/preview.component';
import { ConsumptionComponent } from './consumption/consumption.component';


@NgModule({
  declarations: [ListComponent, PreviewComponent, ConsumptionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListComponent
      }
    ]),
    NgRelaxModule,
    NgZorroAntdModule,
    ConsumptionModule
  ],
  entryComponents: [PreviewComponent]
})
export class ListModule { }
