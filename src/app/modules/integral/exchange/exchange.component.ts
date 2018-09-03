import { Component, OnInit } from '@angular/core';
import { QueryNode } from 'src/app/ng-relax/components/query/query.component';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {

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
