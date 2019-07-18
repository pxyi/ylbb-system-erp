import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-nointention',
  templateUrl: './nointention.component.html',
  styleUrls: ['./nointention.component.less']
})
export class NointentionComponent implements OnInit {

  queryNode = [
    {
      label       : '宝宝昵称',
      key         : 'nick',
      type        : 'input',
    },
    {
      label       : '跟进状态',
      key         : 'followStageId',
      type        : 'select',
      optionsUrl  : '/common/followStageList',
    },
    {
      label       : '来源',
      key         : 'sourceId',
      type        : 'select',
      optionsUrl  : '/memberSource/getList',
      optionKey: { label: 'name', value: 'id' }
    },
    {
      label       : '家长姓名',
      key         : 'parentName',
      type        : 'input'
    }, 
    {
      label       : '手机号码',
      key         : 'mobilePhone',
      type        : 'input'
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
      label       : '下次跟进',
      key         : 'nextFollowTime',
      type        : 'rangepicker',
      valueKey    : ['nextFollowTimeStart', 'nextFollowTimeEnd'],
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
      name  : '宝宝昵称',
      width : '80px'
    },
    {
      name  : '宝宝姓名',
      width : '80px'
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
      width : '120px'
    }, 
    {
      name  : '入库时间',
      width : '180px'
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
      name  : '来源',
      width : '160px'
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

  @ViewChild('EaTable') table;

  constructor(
    private http    : HttpService
  ) { }

  ngOnInit() {
  }

  gainClue(): void {
    this.http.post('/customer/gainClue', { paramJson: JSON.stringify({ id: this.checkedItems.join(',') }) }).then(res => {
      this.checkedItems = [];
      this.table._request();
    })
  }
}
