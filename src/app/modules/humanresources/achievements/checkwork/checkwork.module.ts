import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckworkComponent } from './checkwork.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { UpdateComponent } from './update/update.component';

@NgModule({
  declarations: [CheckworkComponent, UpdateComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([{
      path: '',
      component: CheckworkComponent
    }])
  ],
  entryComponents: [UpdateComponent]
})
export class CheckworkModule { }
