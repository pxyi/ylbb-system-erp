import { AddIntegralComponent } from './add-integral/add-integral.component';
import { AlbumComponent } from './album/album.component';
import { AppointComponent } from './appoint/appoint.component';
import { ConstructionComponent } from './construction/construction.component';
import { ConsumptionComponent } from './consumption/consumption.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { ListComponent } from './list.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { UpdateComponent } from './update/update.component';
import { ImportComponent } from './import/import.component';
import { RouterModule } from '@angular/router';
import { ViserModule } from 'viser-ng';

@NgModule({
  declarations: [ListComponent, UpdateComponent, ImportComponent, ExchangeComponent, ConsumptionComponent, ConstructionComponent, AppointComponent, AlbumComponent, AddIntegralComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([{
      path: '',
      component: ListComponent
    }]),
    ViserModule
  ],
  entryComponents: [UpdateComponent, ImportComponent, ExchangeComponent, ConsumptionComponent, ConstructionComponent, AppointComponent, AlbumComponent, AddIntegralComponent]
})
export class ListModule { }
