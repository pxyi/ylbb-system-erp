import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { CardCreateComponent } from './card-create.component';

@NgModule({
  declarations: [CardCreateComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    NgRelaxModule
  ],
  entryComponents: [CardCreateComponent]
})
export class CardCreateModule { }
