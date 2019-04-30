import { RouterModule } from '@angular/router';
import { VisitModule } from './../visit.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NocardComponent } from './nocard.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [NocardComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    VisitModule,
    RouterModule.forChild([{
      path: '',
      component: NocardComponent
    }])
  ]
})
export class NocardModule { }
