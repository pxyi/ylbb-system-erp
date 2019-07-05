import { AddComponent } from './add/add.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardTypeComponent } from './card-type.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CardTypeComponent, AddComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    NgRelaxModule,
    RouterModule.forChild([
      {
        path: '',
        component: CardTypeComponent
      }
    ])
  ],
  entryComponents: [AddComponent]
})
export class CardTypeModule { }
