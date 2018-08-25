import { UpdateCurriculumComponent } from './curriculum/curriculum.component';
import { MessageComponent } from './message/message.component';
import { UpdateRevokeComponent } from './revoke/revoke.component';
import { UpdateSatisfactionComponent } from './satisfaction/satisfaction.component';
import { PreviewComponent } from './preview/preview.component';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpService } from './../../../ng-relax/services/http.service';
import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactory, ComponentFactoryResolver } from '@angular/core';
import { QueryNode } from 'src/app/ng-relax/components/query/query.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @ViewChild('drawerContainer', {read: ViewContainerRef}) container: ViewContainerRef;
  componentRef: ComponentRef<any>;

  queryNode: QueryNode[] = [
    {
      label       : '会员卡号',
      key         : 'cardCode',
      type        : 'input'
    },
    {
      label       : '会员姓名',
      key         : 'memberName',
      type        : 'input'
    },
    {
      label       : '会员小名',
      key         : 'nick',
      type        : 'input'
    },
    {
      label       : '服务泳师',
      key         : 'teacherId',
      type        : 'select',
      options     : [ { name: '婴儿', id: '婴儿' }, { name: '幼儿', id: '幼儿' } ],
    },
    {
      label       : '婴儿类型',
      key         : 'babyType',
      type        : 'select',
      options     : [ { name: '婴儿', id: '婴儿' }, { name: '幼儿', id: '幼儿' } ],
      isHide      : true
    },
    {
      label       : '消费商品',
      key         : 'commodityId',
      type        : 'select',
      options     : [ { name: '婴儿', id: '婴儿' }, { name: '幼儿', id: '幼儿' } ],
      isHide      : true
    },
    {
      label       : '业务类型',
      key         : 'categoryId',
      type        : 'select',
      options     : [ { name: '婴儿', id: '婴儿' }, { name: '幼儿', id: '幼儿' } ],
      isHide      : true
    },
    {
      label       : '卡类型',
      key         : 'cardTypeId',
      type        : 'select',
      options     : [ { name: '婴儿', id: '婴儿' }, { name: '幼儿', id: '幼儿' } ],
      isHide      : true
    },
    {
      label       : '满意度',
      key         : 'satisfaction',
      type        : 'select',
      options     : [ { name: '婴儿', id: '婴儿' }, { name: '幼儿', id: '幼儿' } ],
      isHide      : true
    },
    {
      label       : '消费日期',
      key         : 'date',
      valueKey    : ['startDate', 'endDate'],
      type        : 'rangepicker',
      isHide      : true
    }
  ]

  operationComponents = {
    preview: {
      title: '查看消费记录',
      component: PreviewComponent
    },
    satisfaction: {
      title: '修改满意度',
      component: UpdateSatisfactionComponent
    },
    revoke: {
      title: '撤销消费',
      component: UpdateRevokeComponent
    },
    message: {
      title: '发短息',
      component: MessageComponent
    },
    curriculum: {
      title: '添加课程',
      component: UpdateCurriculumComponent
    }
  }

  checkedItems: any[] = [];

  showDrawer: boolean;
  drawerTitle: string;

  constructor(
    private http: HttpService,
    private message: NzMessageService,
    private resolver: ComponentFactoryResolver,
    private router: Router
  ) { }

  ngOnInit() {
  }
  operation(type) {
    if (!this.checkedItems.length) {
      this.message.warning('请选择一条数据进行操作');
    } else if (this.operationComponents[type].component) {
      this.showDrawer = true;
      this.drawerTitle = this.operationComponents[type].title;

      this.container.clear();
      let component = this.operationComponents[type].component;
      const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(component);
      this.componentRef = this.container.createComponent(factory);
      this.componentRef.instance.id = this.checkedItems[0];
      // this.componentRef.instance.complate.subscribe(event => console.log(event));
    }
  }


  saveDrawer(e) {
    this.componentRef.instance.save()
  }


}
