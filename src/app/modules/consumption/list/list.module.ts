import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { PreviewComponent } from './preview/preview.component';
import { SatisfactionComponent } from './satisfaction/satisfaction.component';
import { RevokeComponent } from './revoke/revoke.component';
import { MessageComponent } from './message/message.component';
import { CurriculumComponent } from './curriculum/curriculum.component';

@NgModule({
  declarations: [ListComponent, PreviewComponent, SatisfactionComponent, RevokeComponent, MessageComponent, CurriculumComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([{
      path: '',
      component: ListComponent
    }]),
  ],
  entryComponents: [PreviewComponent, SatisfactionComponent, RevokeComponent, MessageComponent, CurriculumComponent]
})
export class ListModule { }
