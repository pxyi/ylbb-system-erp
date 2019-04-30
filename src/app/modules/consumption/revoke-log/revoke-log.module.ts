import { RevokeLogComponent } from './revoke-log.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RevokeLogComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([{
      path: '',
      component: RevokeLogComponent
    }])
  ]
})
export class RevokeLogModule { }
