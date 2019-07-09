import { CreateModule } from './../create/create.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionComponent } from './promotion.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { QRCodeModule } from 'angular2-qrcode';

@NgModule({
  declarations: [PromotionComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([{
      path: '',
      component: PromotionComponent
    }]),
    CreateModule,
    QRCodeModule
  ]
})
export class PromotionModule { }
