import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { NzDrawerService } from 'ng-zorro-antd';
import { QueryNode } from 'src/app/ng-relax/components/query/query.component';
import { ListPageComponent } from 'src/app/ng-relax/components/list-page/list-page.component';
import { DrawerCreate } from 'src/app/ng-relax/decorators/drawer/create.decorator';
import { PreviewComponent } from './preview/preview.component';

@Component({
  selector: 'app-interaction',
  templateUrl: './interaction.component.html',
  styleUrls: ['./interaction.component.less']
})
export class InteractionComponent implements OnInit {

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

  tableThead: any[] = ['会员姓名', '家长姓名', '电话', '内容', '	提交时间', '处理状态', '处理时间', '操作'];

  constructor(
    private http: HttpService,
    private drawer: NzDrawerService
  ) { }

  ngOnInit() {
  }

  @DrawerCreate({ title: '用户建议', content: PreviewComponent }) preview: ({ interactionInfo: object }) => void;

}
