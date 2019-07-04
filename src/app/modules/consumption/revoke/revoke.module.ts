import { RouterModule } from '@angular/router';
import { RevokeComponent } from './revoke.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [RevokeComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    NgRelaxModule,
    RouterModule.forChild([{
      path: '',
      component: RevokeComponent
    }])
  ]
})
export class RevokeModule { }
