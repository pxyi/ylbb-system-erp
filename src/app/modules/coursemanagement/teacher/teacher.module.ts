import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherComponent } from './teacher.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TeacherComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([
      {
        path: '',
        component: TeacherComponent
      }
    ])
  ]
})
export class TeacherModule { }
