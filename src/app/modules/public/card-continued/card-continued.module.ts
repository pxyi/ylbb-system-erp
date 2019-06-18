import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardContinuedComponent } from './card-continued.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';

@NgModule({
  declarations: [CardContinuedComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    NgRelaxModule
  ],
  entryComponents: [CardContinuedComponent]
})
export class CardContinuedModule { }
