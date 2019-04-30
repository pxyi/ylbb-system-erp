import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryNode } from 'src/app/ng-relax/components/query/query.component';
import { NumberComponent } from './number/number.component';
import { SupplementComponent } from './supplement/supplement.component';
import { OpenComponent } from './open/open.component';
import { StopComponent } from './stop/stop.component';
import { ConsumptionComponent } from '../../public/consumption/consumption.component';
import { AppointComponent } from '../../public/appoint/appoint.component';
import { ContinuedComponent } from './continued/continued.component';
import { ChangeComponent } from './change/change.component';
import { NzMessageService, NzDrawerService } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import { ListPageComponent } from 'src/app/ng-relax/components/list-page/list-page.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  
  @ViewChild('listPage') listPage: ListPageComponent;

  operationComponents = {
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
      type        : 'input',
      isRemove    : true
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
      options     : [ { name: '婴儿', id: '婴儿' }, { name: '幼儿', id: '幼儿' } ]
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

  paramsInit: any = {};

  type: string;
  constructor(
    private message: NzMessageService,
    private activatedRoute: ActivatedRoute,
    private drawer: NzDrawerService
  ) {
    this.activatedRoute.queryParamMap.subscribe((res: any) => {
      if (res.params.code) {
        this.type = res.params.type;
        this.paramsInit.cardCode = res.params.code;
        setTimeout(() => {
          this.listPage.eaQuery._queryForm.patchValue({ cardCode: res.params.code })
        });
      }
    });
  }

  ngOnInit() {
  }
  dataChange(dataset) {
    if (this.type) {
      this.checkedItems.push(dataset[0].id);
      dataset[0].checked = true;
      this.operation(this.type);
      this.type = null;
    }
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
            this.openDrawer(this.operationComponents[type]);
          }
        }
      })
    } else if (type === 'open') {
      this.listPage.eaTable.dataSet.map(res => {
        if (res.id == this.checkedItems[0]) {
          if (res.runningState == '停卡') {
            this.openDrawer(this.operationComponents[type]);
          } else {
            this.message.warning('该卡不能重开卡！');
          }
        }
      })
    } else if (type === 'supplement') {
      this.listPage.eaTable.dataSet.map(res => {
        if (res.id == this.checkedItems[0]) {
          if (res.serialNumber) {
            this.openDrawer(this.operationComponents[type]);
          } else {
            this.message.warning('该卡是电子卡片,请点击换卡号！');
          }
        }
      })
    } else if (type === 'appoint') {
      this.listPage.eaTable.dataSet.map(res => {
        if (res.id == this.checkedItems[0]) {
          this.openDrawer({ title: '会员预约', component: AppointComponent, params: { id: res.id, userInfo: JSON.parse(JSON.stringify(res)) } });
        }
      })
    } else if (type === 'consumption') {
      this.listPage.eaTable.dataSet.map(res => {
        if (res.id == this.checkedItems[0]) {
          this.openDrawer({ title: '会员消费', component: ConsumptionComponent, params: { id: res.id, consumptionInfo: JSON.parse(JSON.stringify(res)) } });
        }
      })
    } else if (this.operationComponents[type]) {
      this.openDrawer(this.operationComponents[type]);
    }
  }


  openDrawer(options) {
    let dataSet = JSON.parse(JSON.stringify(this.listPage.eaTable.dataSet));
    let memberCardInfo = dataSet.filter(res => res.id == this.checkedItems[0])[0];
    const drawer = this.drawer.create({
      nzWidth: 720,
      nzTitle: options.title,
      nzContent: options.component,
      nzContentParams: options.params || { id: this.checkedItems[0], memberCardInfo }
    });
    drawer.afterClose.subscribe(res => res && this.listPage.eaTable._request());
  }

}
