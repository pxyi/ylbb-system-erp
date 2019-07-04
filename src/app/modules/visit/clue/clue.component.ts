import { VisitComponent } from './../public/visit/visit.component';
import { UpdateComponent } from './../public/update/update.component';
import { QueryNode } from 'src/app/ng-relax/components/query/query.component';
import { PreviewComponent } from './../public/preview/preview.component';
import { NzDrawerService } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DrawerCreate } from 'src/app/ng-relax/decorators/drawer/create.decorator';

@Component({
  selector: 'app-clue',
  templateUrl: './clue.component.html',
  styleUrls: ['./clue.component.less']
})
export class ClueComponent implements OnInit {

  @ViewChild('EaTable') table;

  queryNode: QueryNode[] = [
    {
      label: '宝宝昵称',
      key: 'nick',
      type: 'input',
    },
    {
      label       : '来源',
      key         : 'customerSourceId',
      optionKey   : { label: 'sourceName', value: 'sourceId' },
      type        : 'select',
      optionsUrl  : '/yeqs/management/selectSource'
    },
    {
      label: '家长姓名',
      key: 'parentName',
      type: 'input',
    },
    {
      label: '手机号码',
      key: 'mobilePhone',
      type: 'input',
    },
    {
      label: '下次跟进',
      key: 'nextFollowTime',
      type: 'rangepicker',
      valueKey: ['nextFollowTimeStart', 'nextFollowTimeEnd']
    },
    {
      label: '宝宝性别',
      key: 'sex',
      type: 'select',
      options: [{ name: '男', id: '男' }, { name: '女', id: '女' }],
      isHide: true
    },
    {
      label: '宝宝生日',
      key: 'birthday',
      type: 'rangepicker',
      valueKey: ['babyBirthdayStart', 'babyBirthdayEnd'],
      isHide: true
    },
    {
      label: '创建时间',
      key: 'createTime',
      type: 'rangepicker',
      valueKey: ['createDateStart', 'createDateEnd'],
      isHide: true
    },
    {
      label: '最后跟进',
      key: 'lastFollowTime',
      type: 'rangepicker',
      valueKey: ['lastFollowTimeStart', 'lastFollowTimeEnd'],
      isHide: true
    },
    {
      label: '收集者',
      key: 'collectorId',
      type: 'select',
      optionsUrl: '/common/collectorList',
      isHide: true
    },
    {
      label: '推荐人',
      key: 'recommendedId',
      type: 'select',
      optionsUrl: '/common/recommenderList',
      isHide: true
    },
  ];
  tableNode = ['宝宝昵称', '宝宝姓名', '宝宝生日', '性别', '月龄', '家长姓名', '家长电话', '所属小区', '入库时间', '下次跟进时间', '最后跟进时间', '来源', '客户状态', '跟进阶段', '收集者']

  constructor(
    private activatedRoute: ActivatedRoute,
    private drawer: NzDrawerService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((res: any) => {
      if (res.params.reset) {
        this.table._request();
      }
    })
  }
  
  @DrawerCreate({ content: PreviewComponent, width: 860, closable: false, params: { followStageId: 2 } }) preview: ({id: number}) => void;

  @DrawerCreate({ title: '新增客户', content: UpdateComponent }) addCustomer: () => void;

  @DrawerCreate({ title: '今日已回访列表', content: VisitComponent, params: { followStageId: 2, status: 0 } }) visitList: () => void;

}
