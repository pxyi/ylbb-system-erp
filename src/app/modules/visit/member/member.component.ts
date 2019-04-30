import { NzDrawerService } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PreviewComponent } from '../public/preview/preview.component';
import { DatePipe } from '@angular/common';
import { DrawerCreate } from 'src/app/ng-relax/decorators/drawer/create.decorator';

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
      key         : 'sourceId',
      type        : 'select',
      optionsUrl  : '/activity/getActivitySource',
      optionKey: { label: 'activityHeadline', value: 'id' }
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
  
  tableNode = [
    {
      name  : '卡号',
      width : '120px'
    },
    {
      name  : '卡类型',
      width : '120px'
    },
    {
      name  : '总卡次（正价/赠送）',
      width : '140px'
    },
    {
      name  : '剩余卡次（正价/赠送）',
      width : '160px'
    },
    {
      name  : '宝宝昵称',
      width : '90px',
    },
    {
      name  : '宝宝姓名',
      width : '90px'
    },
    {
      name  : '宝宝生日',
      width : '100px'
    },
    {
      name  : '性别',
      width : '60px'
    },
    {
      name  : '月龄',
      width : '60px'
    },
    {
      name  : '家长姓名',
      width : '80px'
    },
    {
      name  : '家长电话',
      width : '100px'
    },
    {
      name  : '所属小区',
      width : '100px'
    }, 
    {
      name  : '办卡时间',
      width : '140px'
    },
    {
      name  : '下次跟进时间',
      width : '100px'
    },
    {
      name  : '最后跟进时间',
      width : '180px'
    },
    {
      name  : '渠道来源',
      width : '80px'
    }
  ]

  constructor(
    private drawer: NzDrawerService
  ) { }
  ngOnInit() {
  }

  @DrawerCreate({ width: 860, closable: false, params: { followStageId: 4 }, content: PreviewComponent }) preview: ({ id: number }) => void;

}
