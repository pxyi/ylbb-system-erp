import { CreateModule } from './../create/create.module';
import { UpdatahtmlModule } from './../updatahtml/updatahtml.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityComponent } from './activity.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { QRCodeModule } from 'angular2-qrcode';

@NgModule({
  declarations: [ActivityComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([
      {
        path: '',
        component: ActivityComponent
      }
    ]),
    QRCodeModule,
    CreateModule,
    UpdatahtmlModule
  ]
})
export class ActivityModule { }
