import { QueryNode } from './../../../ng-relax/components/query/query.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    queryNode: QueryNode[] = [
    {
      label       : '卡号',
      key         : 'cardCode',
      type        : 'input'
    },
    {
      label       : '会员姓名',
      key         : 'memberName',
      type        : 'input'
    }, 
    {
      label       : '卡类型',
      key         : 'cardTypeId',
      type        : 'select',
      optionsUrl  : '/common/sourceList'
    },
    {
      label       : '手机号码',
      key         : 'mobilePhone',
      type        : 'input',
      placeholder : '请输入家长手机号码',
      isHide      : true
    },
    {
      label       : '宝宝性别',
      key         : 'sex',
      type        : 'select',
      options     : [ { name: '男', id: '男' }, { name: '女', id: '女' } ],
      placeholder : '请选择宝宝性别',
      isHide      : true
    },
    {
      label       : '宝宝生日',
      key         : 'birthday',
      type        : 'rangepicker',
      valueKey    : ['babyBirthdayStart', 'babyBirthdayEnd'],
      placeholder : ['选择开始时间', '选择结束时间'],
      isHide      : true
    },
    {
      label       : '创建时间',
      key         : 'createTime',
      type        : 'rangepicker',
      valueKey    : ['createDateStart', 'createDateEnd'],
      placeholder : ['选择开始时间', '选择结束时间'],
      isHide      : true
    },
    {
      label       : '下次跟进',
      key         : 'nextFollowTime',
      type        : 'rangepicker',
      valueKey    : ['nextFollowTimeStart', 'nextFollowTimeEnd'],
      placeholder : ['选择开始时间', '选择结束时间'],
      isHide      : true
    },
    {
      label       : '最后跟进',
      key         : 'lastFollowTime',
      type        : 'rangepicker',
      valueKey    : ['lastFollowTimeStart', 'lastFollowTimeEnd'],
      placeholder : ['选择开始时间', '选择结束时间'],
      isHide      : true
    },
    {
      label       : '收集者',
      key         : 'collectorId',
      type        : 'select',
      optionsUrl  : '/common/collectorList',
      placeholder : '请选择收集者',
      isHide      : true
    },
    {
      label       : '推荐人',
      key         : 'recommendedId',
      type        : 'select',
      optionsUrl  : '/common/recommenderList',
      placeholder : '请选择推荐人',
      isHide      : true
    },
  ];
  tableNode = [
    {
      name  : '宝宝昵称',
      width : '120px',
      left  : 0
    },
    {
      name  : '宝宝姓名',
      width : '100px'
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
      width : '100px'
    },
    {
      name  : '家长电话',
      width : '100px'
    },
    {
      name  : '所属小区',
      width : '140px'
    }, 
    {
      name  : '入库时间',
      width : '140px'
    },
    {
      name  : '下次跟进时间',
      width : '140px'
    },
    {
      name  : '最后跟进时间',
      width : '140px'
    },
    {
      name  : '来源',
      width : '80px'
    },
    {
      name  : '客户状态',
      width : '80px'
    },
    {
      name  : '跟进阶段',
      width : '120px'
    },
    {
      name  : '收集者',
      width : '120px'
    }
  ]
  checkedItems: any[] = [];


  constructor() { }

  ngOnInit() {
  }

}