import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { IntegralExchangeComponent } from './integral-exchange.component';

@NgModule({
  declarations: [IntegralExchangeComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([{
      path: '',
      component: IntegralExchangeComponent
    }])
  ]
})
export class IntegralExchangeModule { }
