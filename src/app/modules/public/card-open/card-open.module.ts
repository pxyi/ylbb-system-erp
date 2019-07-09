import { CardOpenComponent } from './card-open.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [CardOpenComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    NgRelaxModule
  ],
  entryComponents: [CardOpenComponent]
})
export class CardOpenModule { }
