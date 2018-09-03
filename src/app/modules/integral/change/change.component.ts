import { Component, OnInit } from '@angular/core';
import { QueryNode } from 'src/app/ng-relax/components/query/query.component';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss']
})
export class ChangeComponent implements OnInit {

  queryNode: QueryNode[] = [
    {
      label       : '手机号',
      key         : 'mobilePhone',
      type        : 'input'
    },
    {
      label       : '会员姓名',
      key         : 'name',
      type        : 'input'
    },
    {
      label       : '扣减/增加',
      key         : 'type',
      type        : 'select',
      options     : [ { name: '系统增加', id: 0 }, { name: '手动增加', id: 1 }, { name: '积分兑换', id: 2 } ]
    },
    {
      label       : '记录时间',
      key         : 'time',
      valueKey    : ['startDate', 'endDate'],
      type        : 'rangepicker'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
