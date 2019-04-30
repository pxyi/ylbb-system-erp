import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeductionComponent } from './deduction.component';
import { UpdateComponent } from './update/update.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DeductionComponent, UpdateComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([{
      path: '',
      component: DeductionComponent
    }])
  ],
  entryComponents: [UpdateComponent]
})
export class DeductionModule { }
