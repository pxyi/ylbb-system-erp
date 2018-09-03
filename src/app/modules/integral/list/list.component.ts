import { Component, OnInit } from '@angular/core';
import { QueryNode } from 'src/app/ng-relax/components/query/query.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  queryNode: QueryNode[] = [
    {
      label       : '会员卡号',
      key         : 'cardCode',
      type        : 'input'
    },
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
      label       : '会员小名',
      key         : 'nick',
      type        : 'input'
    },
    {
      label       : '是否有效',
      key         : 'status',
      type        : 'select',
      options     : [ { name: '有效', id: 1 }, { name: '无效', id: 0 } ],
      isHide      : true
    },
    {
      label       : '积分区间',
      key         : 'between',
      valueKey    : ['startPoint', 'endPoint'],
      type        : 'between',
      isHide      : true
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
