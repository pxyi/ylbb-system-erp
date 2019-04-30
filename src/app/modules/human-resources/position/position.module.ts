import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionComponent } from './position.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { UpdateComponent } from './update/update.component';

@NgModule({
  declarations: [PositionComponent, UpdateComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([{
      path: '',
      component: PositionComponent
    }])
  ],
  entryComponents: [UpdateComponent]
})
export class PositionModule { }
