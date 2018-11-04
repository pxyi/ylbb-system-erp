import { ListPageComponent } from './../../../ng-relax/components/list-page/list-page.component';
import { PreviewComponent } from './../preview/preview.component';
import { NzDrawerService } from 'ng-zorro-antd';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryNode } from '../../../ng-relax/components/query/query.component';
import { CreateDrawer } from 'src/app/ng-relax/decorators/createDrawer.decorator';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss']
})
export class ProposalComponent implements OnInit {

  @ViewChild('EaListPage') listPage: ListPageComponent;

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

  tableThead: any[] = ['会员姓名', '家长姓名', '电话', '内容', '	提交时间', '处理状态', '处理时间', { name: '操作', width: 100, right: 0}];

  constructor(
    private http: HttpService,
    private drawer: NzDrawerService
  ) { }

  ngOnInit() {
  }

  @CreateDrawer('用户建议', PreviewComponent) showModal: (dataInfo) => void;



}
