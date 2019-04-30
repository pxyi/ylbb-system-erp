import { Component, OnInit } from '@angular/core';
import { QueryNode } from 'src/app/ng-relax/components/query/query.component';

@Component({
  selector: 'app-integral-exchange',
  templateUrl: './integral-exchange.component.html',
  styleUrls: ['./integral-exchange.component.less']
})
export class IntegralExchangeComponent implements OnInit {

  queryNode: QueryNode[] = [
    {
      label       : '会员姓名',
      key         : 'name',
      type        : 'input'
    },
    {
      label       : '兑换内容',
      key         : 'exchangeRemark',
      type        : 'input'
    },
    {
      label       : '兑换时间',
      key         : 'time',
      valueKey    : ['startDate', 'endDate'],
      type        : 'rangepicker'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
