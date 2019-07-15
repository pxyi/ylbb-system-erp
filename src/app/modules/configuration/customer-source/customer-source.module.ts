import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomerSourceComponent } from './customer-source.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { UpdateComponent } from './update/update.component';

@NgModule({
  declarations: [CustomerSourceComponent, UpdateComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    NgRelaxModule,
    RouterModule.forChild([
      {
        path: '',
        component: CustomerSourceComponent
      }
    ])
  ],
  entryComponents: [UpdateComponent]
})
export class CustomerSourceModule { }
