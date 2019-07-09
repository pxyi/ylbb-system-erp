import { CardComponent } from './card/card.component';
import { NzDrawerRef } from 'ng-zorro-antd';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';

@Component({
  selector: 'app-settlement',
  templateUrl: './settlement.component.html',
  styleUrls: ['./settlement.component.less']
})
export class SettlementComponent implements OnInit {

  @Input() consumptionInfo: any = {};

  constructor(
    private drawerRef: NzDrawerRef
  ) { }

  ngOnInit() {
    console.log(this.consumptionInfo);
  }

  @DrawerClose() close: (bool?) => void;

  @ViewChild('card') cardComponent: CardComponent;
  saveLoading: boolean;
  save() {
    this.cardComponent.save().then(res => {
      res ? this.close(true) : (this.saveLoading = false);
    });
  }

}
