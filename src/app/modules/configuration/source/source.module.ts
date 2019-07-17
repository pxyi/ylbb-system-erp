import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SourceComponent } from './source.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { UpdateComponent } from './update/update.component';

@NgModule({
  declarations: [SourceComponent, UpdateComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([
      {
        path: '',
        component: SourceComponent
      }
    ])
  ],
  entryComponents: [UpdateComponent]
})
export class SourceModule { }
