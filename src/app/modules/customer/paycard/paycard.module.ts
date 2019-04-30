import { ConsumptionModule } from './../../public/consumption/consumption.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgRelaxModule } from './../../../ng-relax/ng-relax.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaycardComponent } from './paycard.component';
import { RouterModule } from '@angular/router';
import { AfterViewFocusDirective } from './after-view-focus.directive';

@NgModule({
  declarations: [PaycardComponent, AfterViewFocusDirective],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    ConsumptionModule,
    RouterModule.forChild([{
      path: '',
      component: PaycardComponent
    }])
  ]
})
export class PaycardModule { }
