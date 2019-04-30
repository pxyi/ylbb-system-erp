import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { AbmModule } from 'angular-baidu-maps';

@NgModule({
  declarations: [StoreComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([
      {
        path: '',
        component: StoreComponent
      }
    ]),
    AbmModule.forRoot({
      apiKey: '7NCxWo3ADYmuEiFY8GM4SW9yxoNGSnLG'
    })
  ]
})
export class StoreModule { }
