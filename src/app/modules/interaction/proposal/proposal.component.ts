import { Component, OnInit } from '@angular/core';
import { QueryNode } from '../../../ng-relax/components/query/query.component';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss']
})
export class ProposalComponent implements OnInit {

  queryNode: QueryNode[] = [
    {
      label: '会员姓名',
      type: 'input',
      key: 'memberName',
      placeholder: '请输入会员姓名'
    },
    {
      label: '处理状态',
      type: 'select',
      key: 'status',
      placeholder: '请选择处理状态',
      options: [ { name: '待处理', id: 0 }, { name: '已处理', id: 1 }, ]
    },
    {
      label: '提交时间',
      type: 'rangepicker',
      key: 'uploadTime',
      valueKey: ['startDate', 'endDate'],
    }
  ]

  tableThead: string[] = ['会员姓名', '家长姓名', '邮箱', '电话', '内容', '	提交时间', '处理状态', '处理时间', '操作'];

  constructor() { }

  ngOnInit() {
  }

}
