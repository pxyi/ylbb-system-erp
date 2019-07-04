import { IntelligentComponent } from './intelligent.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';

@NgModule({
  declarations: [IntelligentComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    NgRelaxModule,
    RouterModule.forChild([{
      path: '',
      component: IntelligentComponent
    }])
  ]
})
export class IntelligentModule { }
