import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointComponent } from './appoint.component';

@NgModule({
  declarations: [AppointComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule
  ],
  entryComponents: [AppointComponent]
})
export class AppointModule { }
