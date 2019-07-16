import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SatisfactionComponent } from './satisfaction.component';
import { UpdateComponent } from './update/update.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SatisfactionComponent, UpdateComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([{
      path: '',
      component: SatisfactionComponent
    }])
  ],
  entryComponents: [UpdateComponent]
})
export class SatisfactionModule { }
