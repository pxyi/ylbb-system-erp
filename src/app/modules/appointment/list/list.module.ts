import { ConsumptionModule } from './../../public/consumption/consumption.module';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './list.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { PreviewComponent } from './preview/preview.component';
import { ConsumptionTabComponent } from './consumption-tab/consumption-tab.component';

@NgModule({
  declarations: [ListComponent, PreviewComponent, ConsumptionTabComponent],
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
  entryComponents: [PreviewComponent, ConsumptionTabComponent]
})
export class ListModule { }
