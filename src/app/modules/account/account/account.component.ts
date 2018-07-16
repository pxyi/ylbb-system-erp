import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  constructor(
    private fb: FormBuilder = new FormBuilder(),
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.createAccountForm = this.fb.group({
      code: [, [Validators.required]],
      name: [, [Validators.required]],
      password : [, [Validators.required]],
      email: [],
      status: [],
      mono: []
    })
  }


  openCreate() {
    this.showCreateAccount = true;
    this.createAccountForm.reset();
    this.createAccountForm.patchValue({ status: 0 });
  }

  crateAccount() {
    // /accountManagement/modify
  }

}
