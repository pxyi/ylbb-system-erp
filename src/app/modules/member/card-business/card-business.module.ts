import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { CardBusinessComponent } from './card-business.component';

@NgModule({
  declarations: [CardBusinessComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([{
      path: '',
      component: CardBusinessComponent
    }])
  ]
})
export class CardBusinessModule { }
