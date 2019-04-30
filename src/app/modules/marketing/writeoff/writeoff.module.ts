import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WriteoffComponent } from './writeoff.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { PreviewComponent } from './preview/preview.component';

@NgModule({
  declarations: [WriteoffComponent, PreviewComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([{
      path: '',
      component: WriteoffComponent
    }])
  ],
  entryComponents: [PreviewComponent]
})
export class WriteoffModule { }
