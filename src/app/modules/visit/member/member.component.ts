import { NzDrawerService } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PreviewComponent } from '../public/preview/preview.component';
import { DatePipe } from '@angular/common';
import { DrawerCreate } from 'src/app/ng-relax/decorators/drawer/create.decorator';
import { VisitComponent } from '../public/visit/visit.component';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.less']
})
export class MemberComponent implements OnInit {
  
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
  
  tableNode = ['卡号','卡类型','总卡次（正价/赠送）','剩余卡次（正价/赠送）','宝宝昵称','宝宝姓名','宝宝生日','性别','月龄','家长姓名','家长电话','所属小区','办卡时间','下次跟进时间','最后跟进时间','渠道来源']

  constructor(
    private drawer: NzDrawerService
  ) { }
  ngOnInit() {
  }

  @DrawerCreate({ width: 860, closable: false, params: { followStageId: 4 }, content: PreviewComponent }) preview: ({ id: number }) => void;


  @DrawerCreate({ title: '今日已回访列表', content: VisitComponent, params: { followStageId: 4, status: 2 } }) visitList: () => void;

}
