import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { QRCodeModule } from 'angular2-qrcode';
import { CreateModule } from '../create/create.module';
import { PreviewComponent } from './preview/preview.component';

@NgModule({
  declarations: [ListComponent, PreviewComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListComponent
      }
    ]),
    QRCodeModule,
    CreateModule
  ],
  entryComponents: [PreviewComponent]
})
export class ListModule { }
