import { ContinuedComponent } from './continued/continued.component';
import { ChangeComponent } from './change/change.component';
import { AdjustmentComponent } from './adjustment/adjustment.component';
import { QueryNode } from './../../../ng-relax/components/query/query.component';
import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @ViewChild('drawerContainer', {read: ViewContainerRef}) container: ViewContainerRef;
  componentRef: ComponentRef<any>;

  operationComponents = {
    adjustment: {
      title: '通卡调整',
      component: AdjustmentComponent
    },
    change: {
      title: '卡项变更',
      component: ChangeComponent
    },
    continued: {
      title: '续卡',
      component: ContinuedComponent
    },

  }

  queryNode: QueryNode[] = [
    {
      label       : '卡号',
      key         : 'cardCode',
      type        : 'input'
    },
    {
      label       : '区间',
      key         : 'cardCodedd',
      type        : 'between',
      valueKey    : ['start', 'end']
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
  
  checkedItems: any[] = [];

  showDrawer: boolean;
  drawerTitle: string;

  constructor(
    private message: NzMessageService,
    private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
  }

  operation(type) {
    if (!this.checkedItems.length) {
      this.message.warning('请选择一条数据进行操作');
    } else if (this.operationComponents[type]) {
      this.showDrawer = true;
      this.drawerTitle = this.operationComponents[type].title;

      this.container.clear();
      const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(this.operationComponents[type].component);
      this.componentRef = this.container.createComponent(factory);
    }
  }

  saveDrawer() {
  }

}