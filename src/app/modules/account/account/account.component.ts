import { HttpService } from 'src/app/ng-relax/services/http.service';
import { ListPageComponent } from '../../../ng-relax/components/list-page/list-page.component';
import { NzMessageService } from 'ng-zorro-antd';
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
    private http: HttpService,
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
      this.http.post('/accountManagement/modify', { paramJson: JSON.stringify(params) }).then(res => {
        this.EaListPage.EaTable._request();
        this.showCreateAccount = false;
        this.createLoading = false;
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
    this.http.post('/accountManagement/deleteAndReset', { paramJson: JSON.stringify({ id }) }).then(res => {
      this.EaListPage.EaTable._request();
    })
  }

  allocationRole(id) {

  }

  resetPassword(id) {
    this.http.post('/accountManagement/deleteAndReset', { paramJson: JSON.stringify({ id, password: 123456 }) });
  }

}
