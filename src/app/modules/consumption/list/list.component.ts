import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  queryNode = [
    {
      label       : '宝宝昵称',
      key         : 'nick',
      type        : 'input'
    },
    {
      label       : '状态',
      key         : 'status',
      type        : 'radio',
      options     : [ { name: '正常', id: 1 }, { name: '失败', id: 0 } ]
    },
    {
      label       : '宝宝性别',
      key         : 'sex',
      type        : 'select',
      options     : [ { name: '男', id: '男' }, { name: '女', id: '女' } ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
