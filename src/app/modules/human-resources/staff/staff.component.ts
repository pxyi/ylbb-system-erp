import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryNode } from 'src/app/ng-relax/components/query/query.component';
import { ListPageComponent } from 'src/app/ng-relax/components/list-page/list-page.component';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  queryNode: QueryNode[] = [
    {
      label       : '员工姓名',
      key         : 'name',
      type        : 'input'
    },
    {
      label       : '员工手机',
      key         : 'mobile',
      type        : 'input'
    },
    {
      label       : '状态',
      key         : 'state',
      type        : 'select',
      options     : [ { name: '全职', id: '全职' }, { name: '离职', id: '离职' } ]
    },
    {
      label       : '服务区域',
      key         : 'serviceArea',
      type        : 'select',
      options     : [ { name: '婴儿区', id: 1 }, { name: '幼儿区', id: 2 }, { name: '兼顾', id: 3 } ]
    },
    // {
    //   label       : '部门',
    //   key         : 'department',
    //   type        : 'select',
    //   optionsUrl  : 'xx'
    // }
  ]
  
  checkedItems: number[] = [];

  constructor() { }

  ngOnInit() {
  }

  @ViewChild('listPage') listPage: ListPageComponent;

  showDrawer: boolean;
  saveLoading: boolean;

  saveDrawer() {

  }

}
