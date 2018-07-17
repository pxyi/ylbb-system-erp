import { HttpService } from 'src/app/ng-relax/services/http.service';
import { MenuComponent } from './menu/menu.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ListPageComponent } from '../../../ng-relax/components/list-page/list-page.component';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TheadNode } from '../../../ng-relax/components/table/table.component';
import { QueryNode } from '../../../ng-relax/components/query/query.component';

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
    private http : HttpService,
    private modal: NzModalService,
    private message: NzMessageService,
    private fb: FormBuilder = new FormBuilder()
  ) { }

  ngOnInit() {
    this.createRoleForm = this.fb.group({
      name: [, [Validators.required]],
      code: [, [Validators.required]],
      status: [0],
      mono: []
    })
  }

  editRole(data) {
    if (data.edit) {
      data.loading = true;
      this.http.post('/roleManagement/modify', { paramJson: JSON.stringify(data) }).then(res => {
        data.loading = false;
        data.edit = false;
      });
    } else {
      data.edit = true;
    }
  }

  deleteRole(id) {
    this.http.post('/roleManagement/deleteRole', { paramJson: JSON.stringify({id}) }).then(res => {
      this.EaListPage.EaTable._request();
    })
  }

  /* -------------- 新增角色 -------------- */
  createRoleForm: FormGroup
  showCreateRole: boolean = false;
  createLoading: boolean = false;
  openCreate() {
    this.showCreateRole = true;
    this.createRoleForm.reset();
    this.createRoleForm.patchValue({ status: 0 });
  }

  crateRole() {
    if (this.createRoleForm.valid) {
      this.createLoading = true;
      this.http.post('/roleManagement/modify', { paramJson: JSON.stringify(this.createRoleForm.value) }).then(res => {
        this.EaListPage.EaTable._request();
        this.showCreateRole = false;
        this.createLoading = false;
      })
    } else {
      for (let i in this.createRoleForm.controls) {
        this.createRoleForm.controls[i].markAsDirty();
        this.createRoleForm.controls[i].updateValueAndValidity();
      }
    }
  }

  allocationMenu(roleId) {
    let _message = this.message;
    const modal = this.modal.create({
      nzTitle: '分配菜单',
      nzContent: MenuComponent,
      nzComponentParams: {
        roleId,
      },
      nzFooter: [
        {
          label: '取消',
          onClick: () => {
            modal.close();
          }
        },
        {
          label: '确定',
          type: 'primary',
          loading: false,
          onClick(componentInstance) {
            if (componentInstance.loading) {
              _message.warning('请等待数据加载完毕...');
            } else {
              this.loading = true;
              setTimeout(() => {
                this.loading = false;
                modal.close();
              }, 2000);
            }
            console.log('确定', this, componentInstance.checkedNodes)
          }
        }
      ]
    });

    // delay until modal instance created
    window.setTimeout(() => {
      const instance = modal.getContentComponent();
      // instance.subtitle = 'sub title is changed';
    }, 2000);
  }

}
