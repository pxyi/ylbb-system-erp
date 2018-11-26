import { ImportComponent } from './import/import.component';
import { ListPageComponent } from './../../../ng-relax/components/list-page/list-page.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { ConsumptionComponent } from './consumption/consumption.component';
import { AppointComponent } from './appoint/appoint.component';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { QueryNode } from './../../../ng-relax/components/query/query.component';
import { Component, OnInit, ViewChild, ComponentFactoryResolver, ViewContainerRef, ComponentRef, ComponentFactory } from '@angular/core';
import { UpdateComponent } from './update/update.component';
import { ConstructionComponent } from './construction/construction.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AddIntegralComponent } from './add-integral/add-integral.component';
import { AlbumComponent } from './album/album.component';

declare const require: any;
const DataSet = require('@antv/data-set');
const scale = [{
  dataKey: 'percent',
  min: 0,
  formatter: '.0%',
}];



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
      key         : 'communityId',
      type        : 'select',
      optionsUrl  : '/member/communityList',
      isHide      : true
    },
    {
      label       : '婴儿类型',
      key         : 'babyType',
      type        : 'select',
      options     : [ { name: '婴儿', id: '婴儿' }, { name: '幼儿', id: '幼儿' } ]
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

  /* ------------ 操作按钮对应的抽屉组件 ------------ */
  operationComponents = {
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
    update: {
      title     : '编辑',
      component : UpdateComponent
    },
    construction: {
      title     : '建卡',
      component : ConstructionComponent,
      userInfo  : true
    },
    addIntegral: {
      title     : '增加积分',
      component : AddIntegralComponent,
      userInfo  : true
    },
    exchange: {
      title     : '积分兑换',
      component : ExchangeComponent,
      userInfo  : true
    },
    album: {
      title     : '成长相册',
      component : AlbumComponent,
      userInfo  : true
    }
  }

  saveLoading: boolean;

  showDrawer: boolean;
  drawerTitle: string;
  constructor(
    private http: HttpService,
    private message: NzMessageService,
    private resolver: ComponentFactoryResolver,
    private router: Router,
    private modal: NzModalService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParamMap.subscribe((res: any) => {
      this.type = res.params.type;
      this.paramsInit.mobilePhone = res.params.phone;
      setTimeout(() => {
        this.listPage.eaQuery._queryForm.patchValue({ mobilePhone: res.params.phone })
      });
    });
  }

  ngOnInit() {
  }

  type: string;
  mobilePhone: number;
  paramsInit: any = {};
  dataChange(dataset) {
    if (this.type) {
      this.checkedItems.push(dataset[0].id);
      dataset[0].checked = true;
      this.operation(this.type);
    }
  } 

  operation(type) {
    if (!this.checkedItems.length) {
      this.message.warning('请选择一条数据进行操作');
    } else if (type === 'queryCard') {
      this.router.navigate(['/home/membercard/list'], {
        queryParams: {
          memberId: this.checkedItems[0]
        }
      });
    } else if (type === 'consumptionLog') {
      this.router.navigate(['/home/consumption/list'], {
        queryParams: {
          memberId: this.checkedItems[0]
        }
      });
    } else if (type === 'resetPassword') {
      this.modal.confirm({
        nzTitle: '<i>您确定要重置密吗?</i>',
        nzContent: '<b>您确定要重置密吗</b>',
        nzOnOk: () => this.http.post('/member/modifyPassword', { id: this.checkedItems[0] }).then(res => { })
      });
    } else if (type === 'construction') {
      this.http.post('/member/checkMemberInfo', {id : this.checkedItems[0]}, false).then(res => {
        if (res.code == 2043) {
          this.message.warning(res.info);
          this.showDrawer = true;
          this.drawerTitle = '编辑-请补全基本信息';
          this.createComponent(UpdateComponent);
        } else {
          this.showDrawer = true;
          this.drawerTitle = '建卡';
          this.createComponent(this.operationComponents[type]);
        }
      })
    } else if (type === 'album') {
      this.listPage.eaTable.dataSet.map(res => {
        if (res.id === this.checkedItems[0]) {
          if (res.haveCard) {
            this.showDrawer = true;
            this.drawerTitle = this.operationComponents[type].title;
            this.createComponent(this.operationComponents[type]);
          } else {
            this.message.warning('请办卡！');
          }
        }
      })
    } else if (this.operationComponents[type].component) {
      this.showDrawer = true;
      this.drawerTitle = this.operationComponents[type].title;
      this.createComponent(this.operationComponents[type]);
    }
  }

  /* ----------------- 新增客户，创建新增客户抽屉 ----------------- */
  insertCustomer() {
    this.showDrawer = true;
    this.drawerTitle = '新增客户';
    this.container.clear();
    const factory: ComponentFactory<UpdateComponent> = this.resolver.resolveComponentFactory(UpdateComponent);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.id = null;
  }

  /* ------------------------ 导入客户 ------------------------ */
  importCustomer() {
    this.showDrawer = true;
    this.drawerTitle = '导入客户';
    this.container.clear();
    const factory: ComponentFactory<ImportComponent> = this.resolver.resolveComponentFactory(ImportComponent);
    this.componentRef = this.container.createComponent(factory);
  }

  /**
   * @method 点击抽屉保存按钮调用子组件save方法
   * @returns Promise<boolean>
   *            true : 操作成功，关闭抽屉，并刷新列表
   *            false: 操作失败
   */
  @ViewChild('listPage') listPage: ListPageComponent;
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
    if (operationComponent.userInfo) {
      this.listPage.eaTable.dataSet.map(res => {
        if (res.id == this.checkedItems[0]) {
          this.componentRef.instance.userInfo = res;
        }
      })
    }
  }



  /* ------------------------ 查看社区办卡信息 ------------------------ */
  showModal: boolean;
  data;
  labelConfig = ['percent', {
    offset: -40,
    textStyle: {
      rotate: 0,
      textAlign: 'center',
      shadowBlur: 2,
      shadowColor: 'rgba(0, 0, 0, .45)'
    }
  }];
  scale = scale;
  previewCommunity(communityId) {
    this.http.post('/member/findCardFromCommunity', { communityId }, false).then(res => {
      if (res.result) {
        this.showModal = true;
        const dv = new DataSet.View().source(res.result);
        dv.transform({
          type: 'percent',
          field: 'cardNum',
          dimension: 'communityName',
          as: 'percent'
        });
        this.data = dv.rows;
      } else {
        this.message.warning('暂无社区信息');
      }
    })
  }

}