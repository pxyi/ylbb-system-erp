import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { UpdateComponent } from './update/update.component';
import { WarehousingComponent } from './warehousing/warehousing.component';
import { SelfuseComponent } from './selfuse/selfuse.component';

@NgModule({
  declarations: [ListComponent, UpdateComponent, WarehousingComponent, SelfuseComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListComponent
      }
    ]),
  ],
  entryComponents: [UpdateComponent, WarehousingComponent, SelfuseComponent]
})
export class ListModule { }
