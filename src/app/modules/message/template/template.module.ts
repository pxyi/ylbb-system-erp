import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from './template.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { UpdateComponent } from './update/update.component';

@NgModule({
  declarations: [TemplateComponent, UpdateComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([{
      path: '',
      component: TemplateComponent
    }])
  ],
  entryComponents: [UpdateComponent]
})
export class TemplateModule { }
