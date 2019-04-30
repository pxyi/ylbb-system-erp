import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgRelaxModule } from './../../ng-relax/ng-relax.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalysisComponent } from './analysis.component';

@NgModule({
  declarations: [AnalysisComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: '/home/analysis/list',
        pathMatch: 'full'
      },
      {
      path: 'list',
      component: AnalysisComponent
    }])
  ]
})
export class AnalysisModule { }
