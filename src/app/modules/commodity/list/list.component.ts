import { SelfuseComponent } from './selfuse/selfuse.component';
import { UpdateComponent } from './update/update.component';
import { ListPageComponent } from './../../../ng-relax/components/list-page/list-page.component';
import { NzDrawerService, NzMessageService } from 'ng-zorro-antd';
import { HttpService } from './../../../ng-relax/services/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryNode } from 'src/app/ng-relax/components/query/query.component';
import { WarehousingComponent } from './warehousing/warehousing.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @ViewChild('listPage') listPage: ListPageComponent;

  queryNode: QueryNode[] = [
    {
      label       : '商品名称',
      key         : 'name',
      type        : 'input'
    },
    {
      label       : '商品类型',
      key         : 'type',
      type        : 'select',
      options     : [ { name: '商品', id: 1 }, { name: '服务', id: 0 } ]
    },
    {
      label       : '是否计积分',
      key         : 'integral',
      type        : 'select',
      options     : [ { name: '记积分', id: 1 }, { name: '不记积分', id: 0 } ]
    },
    {
      label       : '计费方式',
      key         : 'type',
      type        : 'select',
      options     : [ { name: '计金额', id: 1 }, { name: '计次', id: 0 } ]
    },
  ];

  checkedItems: any[] = [];

  constructor(
    private http: HttpService,
    private drawer: NzDrawerService,
    private message: NzMessageService
  ) { }

  ngOnInit() {
  }
  
  warehousing(commodityInfo) {
    const drawer = this.drawer.create({
      nzTitle: '商品信息',
      nzWidth: 720,
      nzContent: WarehousingComponent,
      nzContentParams: { commodityInfo }
    });
    drawer.afterClose.subscribe(res => res && this.listPage.eaTable._request());
  }

  selfuse(commodityInfo) {
    const drawer = this.drawer.create({
      nzTitle: '商品信息',
      nzWidth: 720,
      nzContent: SelfuseComponent,
      nzContentParams: { commodityInfo }
    });
    drawer.afterClose.subscribe(res => res && this.listPage.eaTable._request());
  }

  update(commodityInfo = {}) {
    const drawer = this.drawer.create({
      nzTitle: '商品信息',
      nzWidth: 720,
      nzContent: UpdateComponent,
      nzContentParams: { commodityInfo }
    });
    drawer.afterClose.subscribe(res => res && this.listPage.eaTable._request());
  }

  delete(id) {
    this.http.post('/commodity/removeCommodity', { id }).then(res => this.listPage.eaTable._request());
  }

  changeStatus(id, status) {
    this.http.post('/commodity/setStatus', { id, status }).then(res => this.listPage.eaTable._request())
  }

  changeDafulat(id, defaultTag) {
    this.http.post('/commodity/setDefaultTag', { id, defaultTag }).then(res => this.listPage.eaTable._request())
  }
 
}
