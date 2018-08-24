import { ExchangeComponent } from './exchange/exchange.component';
import { ConsumptionComponent } from './consumption/consumption.component';
import { AppointComponent } from './appoint/appoint.component';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { QueryNode } from './../../../ng-relax/components/query/query.component';
import { Component, OnInit, ViewChild, ComponentFactoryResolver, ViewContainerRef, ComponentRef, ComponentFactory } from '@angular/core';
import { UpdateComponent } from './update/update.component';
import { ConstructionComponent } from './construction/construction.component';
import { Router } from '@angular/router';
import { AddIntegralComponent } from './add-integral/add-integral.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  queryNode: QueryNode[] = [
    {
      label       : '手机号',
      key         : 'mobilePhone',
      type        : 'input'
    },
    {
      label       : '会员姓名',
      key         : 'name',
      type        : 'input'
    },
    {
      label       : '会员小名',
      key         : 'nick',
      type        : 'input'
    },
    {
      label       : '会员卡号',
      key         : 'cardCode',
      type        : 'input'
    },
    {
      label       : '所属社区',
      key         : 'communityName',
      type        : 'input',
      isHide      : true
    },
    {
      label       : '婴儿类型',
      key         : 'babyType',
      type        : 'select',
      options     : [ { name: '婴儿', id: '婴儿' }, { name: '幼儿', id: '幼儿' } ],
      isHide      : true
    },
    {
      label       : '宝宝月龄',
      key         : 'yueling',
      valueKey    : ['startMonthAge', 'endMonthAge'],
      type        : 'between',
      isHide      : true
    },
    {
      label       : '剩余次数',
      key         : 'yueling',
      valueKey    : ['startCardTimes', 'endCardTimes'],
      type        : 'between',
      isHide      : true
    },
    {
      label       : '宝宝生日',
      key         : 'birthday',
      valueKey    : ['startBirthday', 'endBirthday'],
      type        : 'rangepicker',
      isHide      : true
    }
  ]

  checkedItems: any[] = [];

  operationComponents = {
    appoint: {
      title     : '预约',
      component : AppointComponent,
    },
    consumption: {
      title     : '消费',
      component : ConsumptionComponent
    },
    update: {
      title     : '编辑',
      component : UpdateComponent
    },
    construction: {
      title     : '建卡',
      component : ConstructionComponent
    },
    addIntegral: {
      title     : '增加积分',
      component : AddIntegralComponent
    },
    exchange: {
      title     : '积分兑换',
      component : ExchangeComponent
    }
  }


  showDrawer: boolean;
  drawerTitle: string;

  constructor(
    private http: HttpService,
    private message: NzMessageService,
    private resolver: ComponentFactoryResolver,
    private router: Router,
    private modal: NzModalService
  ) { 
  }

  ngOnInit() {
  }

  operation(type) {
    if (!this.checkedItems.length) {
      this.message.warning('请选择一条数据进行操作');
    } else if (type === 'queryCard') {
      this.router.navigateByUrl('/home/membercard/list')
    } else if (type === 'consumptionLog') {
      this.router.navigateByUrl('/home/consumption/list')
    } else if (type === 'resetPassword') {
      this.modal.confirm({
        nzTitle: '<i>您确定要重置密码?</i>',
        nzContent: '<b>确认重置密码，重置密码后请重新登录</b>',
        nzOnOk: () => console.log('OK')
      });
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



  
  componentRef: ComponentRef<any>;
  @ViewChild("drawerContainer", { read: ViewContainerRef }) container: ViewContainerRef;

}