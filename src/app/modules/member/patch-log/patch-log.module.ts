import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatchLogComponent } from './patch-log.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PatchLogComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([{
      path: '',
      component: PatchLogComponent
    }])
  ]
})
export class PatchLogModule { }
