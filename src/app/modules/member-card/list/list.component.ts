import { ActivatedRoute } from '@angular/router';
import { SupplementComponent } from './supplement/supplement.component';
import { StopComponent } from './stop/stop.component';
import { ListPageComponent } from './../../../ng-relax/components/list-page/list-page.component';
import { ContinuedComponent } from './continued/continued.component';
import { ChangeComponent } from './change/change.component';
import { AdjustmentComponent } from './adjustment/adjustment.component';
import { QueryNode } from './../../../ng-relax/components/query/query.component';
import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { OpenComponent } from './open/open.component';
import { NumberComponent } from './number/number.component';
import { AppointComponent } from './appoint/appoint.component';
import { ConsumptionComponent } from './consumption/consumption.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

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
    appoint: {
      title     : '预约',
      component : AppointComponent,
      userInfo  : true
    },
    consumption: {
      title     : '消费',
      component : ConsumptionComponent,
      userInfo  : true
    },
    stop: {
      title: '停卡',
      component: StopComponent
    },
    open: {
      title: '重开卡',
      component: OpenComponent
    },
    supplement: {
      title: '补卡',
      component: SupplementComponent
    },
    number: {
      title: '换卡号',
      component: NumberComponent
    }
  }

  queryNode: QueryNode[] = [
    {
      label       : '卡号',
      key         : 'cardCode',
      type        : 'input'
    },
    {
      label       : '会员ID',
      key         : 'memberId',
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
      optionsUrl  : '/cardTypeManagement/findList'
    },
    {
      label       : '卡状态',
      key         : 'status',
      type        : 'select',
      options     : [ { name: '正常', id: '0' }, { name: '停卡', id: '1' }, { name: '过期', id: '2' } ]
    },
    {
      label       : '婴儿类型',
      key         : 'babyType',
      type        : 'select',
      options     : [ { name: '婴儿', id: '婴儿' }, { name: '幼儿', id: '幼儿' } ],
      isHide      : true
    },
    {
      label       : '剩余卡次',
      key         : 'remainTimes',
      type        : 'between',
      valueKey    : ['startCardTimes', 'endCardTimes'],
      isHide      : true
    },
    {
      label       : '所属社区',
      key         : 'communityName',
      type        : 'input',
      isHide      : true
    }, 
  ]
  
  paramsDefault = {};
  checkedItems: any[] = [];

  showDrawer: boolean;
  drawerTitle: string;

  constructor(
    private reoute: ActivatedRoute,
    private message: NzMessageService,
    private resolver: ComponentFactoryResolver
  ) { }

  private getQueryParams;
  ngOnInit() {
    this.reoute.queryParamMap.subscribe((res: any) => {
      if (res.params.memberId) {
        this.getQueryParams = res.params;
        setTimeout(() => {
          this.listPage.eaQuery._queryForm.patchValue({ memberId: res.params.memberId });
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
    } else if (type === 'stop') {
      this.listPage.eaTable.dataSet.map(res => {
        if (res.id == this.checkedItems[0]) {
          if (res.turnCard) {
            this.message.warning('该卡有停卡限制,不能停卡！');
          } else {
            this.showDrawer = true;
            this.drawerTitle = this.operationComponents[type].title;
            this.createComponent(this.operationComponents[type]);
          }
        }
      })
    } else if (type === 'open') {
      this.listPage.eaTable.dataSet.map(res => {
        if (res.id == this.checkedItems[0]) {
          if (res.status == 1) {
            this.showDrawer = true;
            this.drawerTitle = this.operationComponents[type].title;
            this.createComponent(this.operationComponents[type]);
          } else {
            this.message.warning('该卡不能重开卡！');
          }
        }
      })
    } else if (type === 'supplement') {
      this.listPage.eaTable.dataSet.map(res => {
        if (res.id == this.checkedItems[0]) {
          if (res.serialNumber) {
            this.showDrawer = true;
            this.drawerTitle = this.operationComponents[type].title;
            this.createComponent(this.operationComponents[type]);
          } else {
            this.message.warning('该卡是电子卡片,请点击换卡号！');
          }
        }
      })
    } else if (this.operationComponents[type]) {
      this.showDrawer = true;
      this.drawerTitle = this.operationComponents[type].title;
      this.createComponent(this.operationComponents[type]);
    }
  }


  @ViewChild('listPage') listPage: ListPageComponent;
  saveLoading: boolean;
  saveDrawer() {
    this.saveLoading = true;
    this.componentRef.instance.save().then(res => {
      this.saveLoading = false;
      if (res) {
        this.showDrawer = false;
        this.listPage.eaTable._request();
      }
    });
  }

    /* ----------------- 新增抽屉组件并传参Id及用户信息 ----------------- */
  componentRef: ComponentRef<any>;
  @ViewChild("drawerContainer", { read: ViewContainerRef }) container: ViewContainerRef;
  createComponent(operationComponent) {
    this.container.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(operationComponent.component || operationComponent);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.id = this.checkedItems[0];
    this.listPage.eaTable.dataSet.map(res => {
      if (res.id == this.checkedItems[0]) {
        this.componentRef.instance.memberCardInfo = res;
      }
    })
  }

}