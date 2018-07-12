import { Component, OnInit } from '@angular/core';
import { QueryNode } from '../../../ng-relax/components/query/query.component';
import { TheadNode } from '../../../ng-relax/components/table/table.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  queryNode: QueryNode[] = [
    {
      label: '角色代码',
      type : 'input',
      key: 'code',
      placeholder: '请输入角色代码'
    },
    {
      label: '角色名称',
      type: 'input',
      key: 'name',
      placeholder: '请输入角色名称'
    }
  ]

  tableThead: TheadNode[] | string[] = ['角色名称', '角色代码', '创建日期', '状态', '操作'];

  constructor() { }

  ngOnInit() {
  }

}
