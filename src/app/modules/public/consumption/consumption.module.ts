import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumptionComponent } from './consumption.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [ConsumptionComponent, DetailComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule
  ],
  entryComponents: [ConsumptionComponent, DetailComponent]
})
export class ConsumptionModule { }
