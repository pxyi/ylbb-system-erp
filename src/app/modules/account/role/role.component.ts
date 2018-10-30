import { HttpService } from 'src/app/ng-relax/services/http.service';
import { MenuComponent } from './menu/menu.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ListPageComponent } from '../../../ng-relax/components/list-page/list-page.component';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild } from '@angular/core';
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
      key: 'code'
    },
    {
      label: '角色名称',
      type: 'input',
      key: 'name'
    }
  ]

  constructor(
    private http : HttpService,
    private modal: NzModalService,
    private message: NzMessageService,
    private fb: FormBuilder = new FormBuilder()
  ) { }

  ngOnInit() {
    this.createRoleForm = this.fb.group({
      id: [],
      name: [, [Validators.required]],
      code: [, [Validators.required]],
      status: [0],
      mono: []
    })
  }

  editRole(data) {
    this.showCreateRole = true;
    this.createRoleForm.patchValue(data);
  }

  deleteRole(id) {
    this.http.post('/roleManagement/deleteRole', { paramJson: JSON.stringify({id}) }).then(res => {
      this.EaListPage.eaTable._request();
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
    if (this.createRoleForm.get('name').value === '门店管理员') { return; }
    if (this.createRoleForm.valid) {
      this.createLoading = true;
      this.http.post('/roleManagement/modify', { paramJson: JSON.stringify(this.createRoleForm.value) }).then(res => {
        this.EaListPage.eaTable._request();
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
    let { message, http } = this;
    const modal = this.modal.create({
      nzTitle: '分配菜单',
      nzStyle: { 'margin-right': '138px' },
      nzContent: MenuComponent,
      nzComponentParams: {
        roleId,
      },
      nzBodyStyle: {
        'max-height': '600px',
        'overflow': 'auto'
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
              message.warning('请等待数据加载完毕...');
            } else {
              this.loading = true;
              http.post('/roleManagement/saveRoleMenu', { 
                paramJson: JSON.stringify({ 
                  roleId: componentInstance.roleId, 
                  id: componentInstance.roleInfoId || '',
                  roleJsonInfo: componentInstance.checkedNodes.join(',') 
                }) 
              }).then(res => {
                modal.close();
              }, err => {
                this.loading = false;
              })
            }
          }
        }
      ]
    });
  }

}
