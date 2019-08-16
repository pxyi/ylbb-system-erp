import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MoneyComponent } from './money/money.component';

@Component({
  selector: 'app-settlement',
  templateUrl: './settlement.component.html',
  styleUrls: ['./settlement.component.less']
})
export class SettlementComponent implements OnInit {

  @Input() consumptionInfo: any = {};

  selectIndex = 0;

  constructor() { }

  ngOnInit() {
    this.selectIndex = this.consumptionInfo.haveCard ? 0 : 1;
  }

  @ViewChild('money') moneyComponent: MoneyComponent;
  selectChange() {
    this.moneyComponent.addKeypressEventListener(this.selectIndex == 1 ? 'add' : 'remove');
  }

  

}
