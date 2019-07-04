import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewComponent } from './public/preview/preview.component';
import { UpdateComponent } from './public/update/update.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { VisitComponent } from './public/visit/visit.component';

@NgModule({
  declarations: [PreviewComponent, UpdateComponent, VisitComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule
  ],
  entryComponents: [PreviewComponent, UpdateComponent, VisitComponent]
})
export class VisitModule { }
