import { Component, OnInit, ViewChild } from '@angular/core';
import { PreviewComponent } from '../public/preview/preview.component';
import { NzDrawerService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
import { DrawerCreate } from 'src/app/ng-relax/decorators/drawer/create.decorator';
import { VisitComponent } from '../public/visit/visit.component';
@Component({
  selector: 'app-nocard',
  templateUrl: './nocard.component.html',
  styleUrls: ['./nocard.component.less']
})
export class NocardComponent implements OnInit {

  @ViewChild('EaTable') table;
  
  queryNode = [
    {
      label       : '宝宝昵称',
      key         : 'nick',
      type        : 'input',
    },
    {
      label       : '来源',
      key         : 'customerSourceId',
      optionKey   : { label: 'sourceName', value: 'sourceId' },
      type        : 'select',
      optionsUrl  : '/management/selectSource'
    },
    {
      label       : '家长姓名',
      key         : 'parentName',
      type        : 'input',
    }, 
    {
      label       : '手机号码',
      key         : 'mobilePhone',
      type        : 'input',
    },
    {
      label       : '下次跟进',
      key         : 'nextFollowTime',
      type        : 'rangepicker',
      valueKey    : ['nextFollowTimeStart', 'nextFollowTimeEnd']
    },
    {
      label       : '宝宝性别',
      key         : 'sex',
      type        : 'select',
      options     : [ { name: '男', id: '男' }, { name: '女', id: '女' } ],
      isHide      : true
    },
    {
      label       : '宝宝生日',
      key         : 'birthday',
      type        : 'rangepicker',
      valueKey    : ['babyBirthdayStart', 'babyBirthdayEnd'],
      isHide      : true
    },
    {
      label       : '创建时间',
      key         : 'createTime',
      type        : 'rangepicker',
      valueKey    : ['createDateStart', 'createDateEnd'],
      isHide      : true
    },
    {
      label       : '最后跟进',
      key         : 'lastFollowTime',
      type        : 'rangepicker',
      valueKey    : ['lastFollowTimeStart', 'lastFollowTimeEnd'],
      isHide      : true
    },
    {
      label       : '收集者',
      key         : 'collectorId',
      type        : 'select',
      optionsUrl  : '/common/collectorList',
      isHide      : true
    },
    {
      label       : '推荐人',
      key         : 'recommendedId',
      type        : 'select',
      optionsUrl  : '/common/recommenderList',
      isHide      : true
    },
  ];
  tableNode = ['宝宝昵称','宝宝姓名','宝宝生日','性别','月龄','家长姓名','家长电话','所属小区','体验时间','下次跟进时间','最后跟进时间','来源','客户状态','跟进阶段','收集者']

  constructor(
    private drawer: NzDrawerService,
    private format: DatePipe
  ) { }
  
  ngOnInit() {
  }

  @DrawerCreate({ width: 860, closable: false,  content: PreviewComponent, params: { followStageId: 3 } }) preview: ({ id: number} ) => void;

  @DrawerCreate({ title: '今日已回访列表', content: VisitComponent, params: { followStageId: 3, status: 1 } }) visitList: () => void;
  
}
