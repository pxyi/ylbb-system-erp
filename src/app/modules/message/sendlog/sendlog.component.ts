import { QueryNode } from './../../../ng-relax/components/query/query.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sendlog',
  templateUrl: './sendlog.component.html',
  styleUrls: ['./sendlog.component.less']
})
export class SendlogComponent implements OnInit {

  showMoreMobile: boolean;
  moreMobile: string;

  constructor() { }

  ngOnInit() { }

  queryNode: QueryNode[] = [
    {
      label : '接收手机',
      key   : 'mobile',
      type  : 'input'
    },
    {
      label : '发送内容',
      key   : 'content',
      type  : 'input'
    },
    {
      label : '发送日期',
      key   : 'time',
      type  : 'rangepicker',
      valueKey: ['startDate', 'endDate']
    },
  ]

  newsQueryNode = [
    {
      label : '会员姓名',
      key   : 'memberName',
      type  : 'input'
    },
    {
      label : '是否已读',
      key   : 'readFlag',
      type  : 'select',
      options: [{ name: '已读', id: true}, {name: '未读', id: false}]
    },
    {
      label : '发送日期',
      key   : 'time',
      type  : 'rangepicker',
      valueKey: ['startDate', 'endDate']
    },
  ]

}
