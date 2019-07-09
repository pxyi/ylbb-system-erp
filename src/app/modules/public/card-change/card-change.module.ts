import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardChangeComponent } from './card-change.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';

@NgModule({
  declarations: [CardChangeComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    NgRelaxModule
  ],
  entryComponents: [CardChangeComponent]
})
export class CardChangeModule { }
