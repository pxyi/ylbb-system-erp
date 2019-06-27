import { RevokeListComponent } from './revoke-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';

import { PreviewComponent } from './preview/preview.component';
import { SatisfactionComponent } from './satisfaction/satisfaction.component';
import { RevokeComponent } from './revoke/revoke.component';
import { MessageComponent } from './message/message.component';
import { CurriculumComponent } from './curriculum/curriculum.component';

@NgModule({
  declarations: [RevokeListComponent, PreviewComponent, SatisfactionComponent, RevokeComponent, MessageComponent, CurriculumComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([{
      path: '',
      component : RevokeListComponent
    }]),
  ],
  entryComponents: [PreviewComponent, SatisfactionComponent, RevokeComponent, MessageComponent, CurriculumComponent]
})
export class RevokeListModule { }
