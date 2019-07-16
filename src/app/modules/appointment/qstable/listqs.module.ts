import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListqsComponent } from './listqs.component';
import { RouterModule } from '@angular/router';
import { MemberCardDetailModule } from '../../public/member-card-detail/member-card-detail.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { PreviewComponent } from './preview/preview.component';
import { ConsumptionComponent } from './consumption/consumption.component';


@NgModule({


  declarations: [ListqsComponent, PreviewComponent, ConsumptionComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    NgRelaxModule,
    MemberCardDetailModule,
    RouterModule.forChild([{
      path: '',
      component: ListqsComponent
    }])
  ],
  exports: [ListqsComponent, PreviewComponent, ConsumptionComponent],
  entryComponents: [PreviewComponent, ConsumptionComponent]


})

export class ListqsModule { }
