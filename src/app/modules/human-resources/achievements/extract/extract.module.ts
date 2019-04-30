import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtractComponent } from './extract.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ExtractComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([{
      path: '',
      component: ExtractComponent
    }])
  ]
})
export class ExtractModule { }
