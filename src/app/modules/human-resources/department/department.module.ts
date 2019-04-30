import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentComponent } from './department.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { UpdateComponent } from './update/update.component';

@NgModule({
  declarations: [DepartmentComponent, UpdateComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([{
      path: '',
      component: DepartmentComponent
    }])
  ],
  entryComponents: [UpdateComponent]
})
export class DepartmentModule { }
