import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.less']
})
export class MoneyComponent implements OnInit {

  @Input() consumptionInfo: any = {};

  constructor() { }

  ngOnInit() {
  }

}
