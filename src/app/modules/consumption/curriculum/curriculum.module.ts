import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurriculumComponent } from './curriculum.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { UpdateComponent } from './update/update.component';

@NgModule({
  declarations: [CurriculumComponent, UpdateComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([{
      path: '',
      component: CurriculumComponent
    }])
  ],
  entryComponents: [UpdateComponent]
})
export class CurriculumModule { }
