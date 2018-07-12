import { ListPageComponent } from './../../../ng-relax/components/list-page/list-page.component';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TheadNode } from '../../../ng-relax/components/table/table.component';
import { QueryNode } from '../../../ng-relax/components/query/query.component';
import { YlbbResponse } from '../../../core/interface-config';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  @ViewChild('EaListPage') EaListPage: ListPageComponent;
  queryNode: QueryNode[] = [
    {
      label: '角色代码',
      type: 'input',
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

  tableThead: TheadNode[] | string[] = ['角色名称', '角色代码', '创建日期', '备注', '状态', '操作'];

  constructor(
    private http : HttpClient,
    private message: NzMessageService
  ) { }

  ngOnInit() {
  }

  editRole(data) {
    if (data.edit) {
      data.loading = true;
      this.http.post<YlbbResponse>('/roleManagement/modify', { paramJson: JSON.stringify(data) }).subscribe(res => {
        data.loading = false;
        data.edit = false;
        this.message.create(res.code == 1000 ? 'success' : 'warning', res.info);
      });
    } else {
      data.edit = true;
    }
  }

  deleteRole(id) {
    this.http.post<YlbbResponse>('/roleManagement/deleteRole', { paramJson: JSON.stringify({id}) }).subscribe(res => {
      if (res.code == 1000) {
        this.EaListPage.EaTable._request();
      }
      this.message.create(res.code == 1000 ? 'success' : 'warning', res.info);
    })
  }

}
