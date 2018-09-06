import { DatePipe } from '@angular/common';
import { ListPageComponent } from './../../../ng-relax/components/list-page/list-page.component';
import { UpdateCurriculumComponent } from './curriculum/curriculum.component';
import { MessageComponent } from './message/message.component';
import { UpdateRevokeComponent } from './revoke/revoke.component';
import { UpdateSatisfactionComponent } from './satisfaction/satisfaction.component';
import { PreviewComponent } from './preview/preview.component';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpService } from './../../../ng-relax/services/http.service';
import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactory, ComponentFactoryResolver } from '@angular/core';
import { QueryNode } from 'src/app/ng-relax/components/query/query.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @ViewChild('listPage') listPage: ListPageComponent;

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
      label       : '会员ID',
      key         : 'memberId',
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
      optionsUrl  : '/tongka/teacherList'
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
      optionsUrl  : '/cardTypeManagement/findList',
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
      default     : [new Date(), new Date()]
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

  paramsDefault;

  constructor(
    private http: HttpService,
    private message: NzMessageService,
    private resolver: ComponentFactoryResolver,
    private router: Router,
    private format: DatePipe,
    private reoute: ActivatedRoute
  ) { 
    this.paramsDefault = {
      startDate: this.format.transform(new Date(), 'yyyy-MM-dd'),
      endDate: this.format.transform(new Date(), 'yyyy-MM-dd')
    }
  }

  private getQueryParams;
  ngOnInit() {
    this.reoute.queryParamMap.subscribe((res: any) => {
      if (res.params.memberId) {
        this.getQueryParams = res.params;
        setTimeout(() => {
          this.listPage.eaQuery._queryForm.patchValue(this.getQueryParams);
        });
      }
    })
  }

  requestReady(e) {
    this.getQueryParams && this.listPage.eaTable.request(this.getQueryParams);
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


  saveDrawer() {
    this.componentRef.instance.save()
  }


}
