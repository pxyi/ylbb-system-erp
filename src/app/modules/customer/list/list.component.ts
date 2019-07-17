import { SettlementComponent } from './../../public/settlement/settlement.component';
import { ImportComponent } from './import/import.component';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { QueryNode } from 'src/app/ng-relax/components/query/query.component';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { NzMessageService, NzModalService, NzDrawerService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { ListPageComponent } from 'src/app/ng-relax/components/list-page/list-page.component';
import { UpdateComponent } from './update/update.component';
import { ConsumptionComponent } from '../../public/consumption/consumption.component';
import { ConstructionComponent } from './construction/construction.component';
import { AddIntegralComponent } from './add-integral/add-integral.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { AlbumComponent } from './album/album.component';
import { AppointComponent } from '../../public/appoint/appoint.component';
import { ConsumptionTabComponent } from './consumption-tab/consumption-tab.component';

declare const require: any;
const DataSet = require('@antv/data-set');

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  
  @ViewChild('listPage') listPage: ListPageComponent;

  nzSwitch:boolean = true;

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
  
  constructor(
    private http: HttpService,
    private message: NzMessageService,
    private router: Router,
    private modal: NzModalService,
    private drawer: NzDrawerService
  ) {
  }

  operation(type) {
    if (!this.checkedItems.length) {
      this.message.warning('请选择一条数据进行操作');
    } else if (type === 'queryCard') {
      this.listPage.eaTable.dataSet.map(res => {
        if (res.id === this.checkedItems[0]) {
          if (res.haveCard) {
            setTimeout(() => {
              this.router.navigate(['/home/member/list'], {
                queryParams: {
                  memberId: res.id
                }
              });
            }, 300);
          } else {
            this.message.warning('该客户暂未办理会员卡');
          }
        }
      })
    } else if (type === 'consumptionLog') {
      setTimeout(() => {
        this.router.navigate(['/home/consumption/list'], {
          queryParams: {
            memberId: this.checkedItems[0]
          }
        });
      }, 300);
    } else if (type === 'resetPassword') {
      this.modal.confirm({
        nzTitle: '<i>您确定要重置密吗?</i>',
        nzContent: '<b>您确定要重置密吗</b>',
        nzOnOk: () => this.http.post('/member/modifyPassword', { id: this.checkedItems[0] }).then(res => { })
      });
    } else if (type === 'construction' || type === 'appoint') {
      this.http.post('/member/checkMemberInfo', { id: this.checkedItems[0] }, false).then(res => {
        if (res.code == 2053) {
          this.message.warning(res.info);
          this.openDrawer({ title: '编辑-请补全基本信息', component: UpdateComponent });
        } else {
          let options: any = {};
          if (type === 'consumption') {
            let dataSet = JSON.parse(JSON.stringify(this.listPage.eaTable.dataSet));
            let consumptionInfo = dataSet.filter(res => res.id == this.checkedItems[0])[0];
            options.params = { consumptionInfo }
          }
          this.openDrawer(Object.assign(options, this.operationComponents[type]));
        }
      })
    } else if (type === 'consumption'){
      this.http.post('/member/checkMemberInfo', { id: this.checkedItems[0] }, false).then(res => {
        if (res.code == 2053) {
          this.message.warning(res.info);
          this.newDrawer({ title: '编辑-请补全基本信息', component: UpdateComponent });
        } else {
          let options: any = {};
          if (type === 'consumption') {
            let dataSet = JSON.parse(JSON.stringify(this.listPage.eaTable.dataSet));
            let consumptionInfo = dataSet.filter(res => res.id == this.checkedItems[0])[0];
            options.params = { consumptionInfo }
          }
          var data = {
            title     : '消费',
            component : ConsumptionTabComponent,
            userInfo  : true
          }
          if (this.nzSwitch) {
            this.newDrawer(Object.assign(options, data));
          } else {
            this.openDrawer(Object.assign(options, this.operationComponents[type]));
          }
        }
      })
    } else if (type === 'album') {
      this.listPage.eaTable.dataSet.map(res => {
        if (res.id === this.checkedItems[0]) {
          if (res.haveCard) {
            this.openDrawer(this.operationComponents[type]);
          } else {
            this.message.warning('请办卡！');
          }
        }
      })
    } else if (this.operationComponents[type].component) {
      this.openDrawer(this.operationComponents[type]);
    }
  }


  ngOnInit() {
  }

  openDrawer(options) {
    let dataSet = JSON.parse(JSON.stringify(this.listPage.eaTable.dataSet));
    let userInfo = options.userInfo ? dataSet.filter(res => res.id == this.checkedItems[0])[0] : {};
    const drawer = this.drawer.create({
      nzWidth: 720,
      nzTitle: options.title || null,
      nzContent: options.component,
      nzContentParams: options.params || { id: this.checkedItems[0], userInfo }
    });
    drawer.afterClose.subscribe(res => res && this.listPage.eaTable._request());
  }

  newDrawer(options) {
    let dataSet = JSON.parse(JSON.stringify(this.listPage.eaTable.dataSet));
    let userInfo = options.userInfo ? dataSet.filter(res => res.id == this.checkedItems[0])[0] : {};
    const drawer = this.drawer.create({
      nzWidth: 1300,
      nzTitle: options.title || null,
      nzContent: options.component,
      nzContentParams: options.params || { id: this.checkedItems[0], userInfo },
      nzWrapClassName: 'drawerRef'
    });
    drawer.afterClose.subscribe(res => res && this.listPage.eaTable._request());
  }

  insert() {
    this.openDrawer({title: '新建客户', component: UpdateComponent, params: { id: null }});
  }
  import() {
    this.openDrawer({ title: '导入客户', component: ImportComponent, params: {} });
  }

  /* ------------------------ 查看社区办卡信息 ------------------------ */
  showModal: boolean;
  chartData;
  scale = [{
    dataKey: 'percent',
    min: 0,
    formatter: '.0%',
  }];
  labelConfig = ['percent', {
    formatter: (val, item) => {
      return `${item.point.item}：${item.point.count}`;
    },
  }];
  previewCommunity(communityId) {
    this.http.post('/member/findCardFromCommunity', { communityId }, false).then(res => {
      if (res.result) {
        this.showModal = true;
        res.result.map(res => { res.item = res.communityName; res.count = res.cardNum; res.percent = null; })
        const dv = new DataSet.View().source(res.result);
        dv.transform({
          type: 'percent',
          field: 'count',
          dimension: 'item',
          as: 'percent'
        });
        this.chartData = dv.rows;
      } else {
        this.message.warning('暂无社区信息');
      }
    })
  }

  changeSwitchValue(event) {
    this.nzSwitch = event;
  }

}
