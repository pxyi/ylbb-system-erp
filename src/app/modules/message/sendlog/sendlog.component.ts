import { QueryNode } from './../../../ng-relax/components/query/query.component';
import { AppState } from './../../../core/reducers/reducers-config';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sendlog',
  templateUrl: './sendlog.component.html',
  styleUrls: ['./sendlog.component.scss']
})
export class SendlogComponent implements OnInit {

  @ViewChild('breadcrumbTmpt') breadcrumbTmpt: TemplateRef<any>;

  selectIndex: number = 0;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch({ type: 'setBreadcrumb', payload: this.breadcrumbTmpt });
  }

  indexChange() {
    console.log(this.selectIndex)
  }

  shortQueryNode: QueryNode[] = [
    {
      label : '接收手机号',
      key   : 'mobile',
      type  : 'input'
    },
    {
      label : '发送内容',
      key   : 'content',
      type  : 'input'
    },
    {
      label : '发送日期',
      key   : 'time',
      type  : 'rangepicker',
      valueKey: ['startDate', 'endDate']
    },
  ]

  newsQueryNode = [
    {
      label : '会员姓名',
      key   : 'memberName',
      type  : 'input'
    },
    {
      label : '是否已读',
      key   : 'readFlag',
      type  : 'select',
      options: [{ name: '已读', id: true}, {name: '未读', id: false}]
    },
    {
      label : '发送日期',
      key   : 'time',
      type  : 'rangepicker',
      valueKey: ['startDate', 'endDate']
    },
  ]

}
