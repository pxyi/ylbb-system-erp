import { SettlementModule } from './../../public/settlement/settlement.module';
import { ViserModule } from 'viser-ng';
import { AppointModule } from './../../public/appoint/appoint.module';
import { RouterModule } from '@angular/router';
import { ConsumptionModule } from './../../public/consumption/consumption.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { UpdateComponent } from './update/update.component';
import { ConstructionComponent } from './construction/construction.component';
import { AddIntegralComponent } from './add-integral/add-integral.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { ImportComponent } from './import/import.component';
import { AlbumComponent } from './album/album.component';
import { QRCodeModule } from 'angular2-qrcode';


@NgModule({
  declarations: [ListComponent, UpdateComponent, ConstructionComponent, AddIntegralComponent, ExchangeComponent, ImportComponent, AlbumComponent ],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    ConsumptionModule,
    AppointModule,
    QRCodeModule,
    SettlementModule,
    RouterModule.forChild([{
      path: '',
      component: ListComponent
    }]),
    ViserModule
  ],
  entryComponents: [UpdateComponent, ConstructionComponent, AddIntegralComponent, ExchangeComponent, ImportComponent, AlbumComponent ]
})
export class ListModule { }
