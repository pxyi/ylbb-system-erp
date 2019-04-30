import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule
  ],
  entryComponents: [CreateComponent]
})
export class CreateModule { }
