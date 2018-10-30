import { Component, OnInit } from '@angular/core';
import { QueryNode } from 'src/app/ng-relax/components/query/query.component';

@Component({
  selector: 'app-satisfaction',
  templateUrl: './satisfaction.component.html',
  styleUrls: ['./satisfaction.component.scss']
})
export class SatisfactionComponent implements OnInit {

  queryNode: QueryNode[] = [
    {
      label       : '会员卡号',
      key         : 'cardCode',
      type        : 'input'
    },
    {
      label       : '会员姓名',
      key         : 'memberName',
      type        : 'input'
    },
    {
      label       : '操作员',
      key         : 'accountId',
      type        : 'select',
      optionsUrl  : '/common/getAccountList '
    },
    {
      label       : '操作日期',
      key         : 'date',
      valueKey    : ['startDate', 'endDate'],
      type        : 'rangepicker'
    },
    {
      label       : '消费日期',
      key         : 'cdate',
      valueKey    : ['cstartDate', 'cendDate'],
      type        : 'rangepicker'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
