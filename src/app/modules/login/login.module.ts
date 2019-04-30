import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { Routes, RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent
      }
    ]),
    NgRelaxModule,
    NgZorroAntdModule
  ]
})
export class LoginModule { }
