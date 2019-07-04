import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { ListComponent } from './list.component';
import { PreviewComponent } from './preview/preview.component';
import { UpdateSatisfactionComponent } from './satisfaction/satisfaction.component';
import { UpdateRevokeComponent } from './revoke/revoke.component';
import { MessageComponent } from './message/message.component';
import { UpdateCurriculumComponent } from './curriculum/curriculum.component';

@NgModule({
  declarations: [ListComponent, PreviewComponent, UpdateSatisfactionComponent, UpdateRevokeComponent, MessageComponent, UpdateCurriculumComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    NgRelaxModule,
    RouterModule.forChild([{
      path: '',
      component: ListComponent
    }])
  ],
  entryComponents: [PreviewComponent, UpdateSatisfactionComponent, UpdateRevokeComponent, MessageComponent, UpdateCurriculumComponent]
})
export class ListModule { }
