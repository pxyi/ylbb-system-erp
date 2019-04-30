import { Component, OnInit } from '@angular/core';
import { QueryNode } from 'src/app/ng-relax/components/query/query.component';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.less']
})
export class LogComponent implements OnInit {

  queryNode: QueryNode[] = [
    {
      label: '登录名',
      type: 'input',
      key: 'code',
      placeholder: '请输入登录名'
    },
    {
      label: '中文名',
      type: 'input',
      key: 'name',
      placeholder: '请输入中文名'
    }
  ]

  tableThead: string[] = ['登录名', '中文名', '登录IP', 'IP所在地', '登录时间', '登录方式'];
  
  constructor() { }

  ngOnInit() {
  }

}
