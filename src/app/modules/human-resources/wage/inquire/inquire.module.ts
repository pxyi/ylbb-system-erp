import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InquireComponent } from './inquire.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { PreviewComponent } from './preview/preview.component';

@NgModule({
  declarations: [InquireComponent, PreviewComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([{
      path: '',
      component: InquireComponent
    }])
  ],
  entryComponents: [PreviewComponent]
})
export class InquireModule { }
