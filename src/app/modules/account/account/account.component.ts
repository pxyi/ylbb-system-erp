import { ListPageComponent } from '../../../ng-relax/components/list-page/list-page.component';
import { NzMessageService } from 'ng-zorro-antd';
import { YlbbResponse } from '../../../core/interface-config';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryNode } from '../../../ng-relax/components/query/query.component';
import { TheadNode } from '../../../ng-relax/components/table/table.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  @ViewChild('EaListPage') EaListPage: ListPageComponent;

  queryNode: QueryNode[] = [
    {
      label: '登录名',
      type : 'input',
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

  tableThead: TheadNode[] | string[] = ['登录名', '中文名', '邮箱', '创建日期', '状态', '操作'];

  createAccountForm: FormGroup;
  showCreateAccount: boolean;
  createLoading: boolean;

  createAccountId: number;

  constructor(
    private fb: FormBuilder = new FormBuilder(),
    private http: HttpClient,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.createAccountForm = this.fb.group({
      code: [, [Validators.required]],
      name: [, [Validators.required]],
      password : [, [Validators.required]],
      email: [],
      status: [],
      memo: []
    })
  }


  openCreate() {
    this.createAccountId = null;
    this.showCreateAccount = true;
    this.createAccountForm.reset();
    this.createAccountForm.patchValue({ status: 0 });
  }

  crateAccount() {
    if (this.createAccountForm.valid) {
      let params = this.createAccountForm.value;
      if (this.createAccountId) {
        params.id = this.createAccountId;
        delete params.password;
      }
      this.http.post<YlbbResponse>('/accountManagement/modify', { paramJson: JSON.stringify(params) }).subscribe(res => {
        if (res.code == 1000) {
          this.EaListPage.EaTable._request();
          this.showCreateAccount = false;
          this.createLoading = false;
        }
        this.message.create(res.code == 1000 ? 'success' : 'warning', res.info);
      })
    } else {
      for (let i in this.createAccountForm.controls) {
        this.createAccountForm.controls[i].markAsDirty();
        this.createAccountForm.controls[i].updateValueAndValidity();
      }
    }
  }

  editAccount(data) {
    this.createAccountId = data.id;
    this.showCreateAccount = true;
    this.createAccountForm.reset();
    this.createAccountForm.patchValue(data);
  }

  deleteAccount(id) {
    this.http.post<YlbbResponse>('/accountManagement/deleteAndReset', { paramJson: JSON.stringify({ id }) }).subscribe(res => {
      this.message.create(res.code == 1000 ? 'success' : 'warning', res.info);
      this.EaListPage.EaTable._request();
    })
  }

  allocationRole(id) {

  }

  resetPassword(id) {
    this.http.post<YlbbResponse>('/accountManagement/deleteAndReset', { paramJson: JSON.stringify({ id, password: 123456 }) }).subscribe(res => {
      this.message.create(res.code == 1000 ? 'success' : 'warning', res.info);
    })
  }

}
