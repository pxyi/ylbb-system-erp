import { SelfuseComponent } from './selfuse/selfuse.component';
import { UpdateComponent } from './update/update.component';
import { NzDrawerService, NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryNode } from 'src/app/ng-relax/components/query/query.component';
import { WarehousingComponent } from './warehousing/warehousing.component';
import { ListPageComponent } from 'src/app/ng-relax/components/list-page/list-page.component';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { DrawerCreate } from 'src/app/ng-relax/decorators/drawer/create.decorator';
import { ModifyData } from 'src/app/ng-relax/decorators/list/modify.decorator';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

  @ViewChild('listPage') listPage: ListPageComponent;

  queryNode: QueryNode[] = [
    {
      label: '商品名称',
      key: 'name',
      type: 'input'
    },
    {
      label: '商品类型',
      key: 'type',
      type: 'select',
      options: [{ name: '商品', id: 1 }, { name: '服务', id: 0 }]
    },
    {
      label: '是否计积分',
      key: 'integral',
      type: 'select',
      options: [{ name: '记积分', id: 1 }, { name: '不记积分', id: 0 }]
    },
    {
      label: '计费方式',
      key: 'type',
      type: 'select',
      options: [{ name: '计金额', id: 1 }, { name: '计次', id: 0 }]
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

  @DrawerCreate({ title: '商品信息', content: WarehousingComponent }) warehousing: ({ commodityInfo: object }) => void;

  @DrawerCreate({ title: '商品信息', content: SelfuseComponent }) selfuse: ({ commodityInfo: object }) => void;

  @DrawerCreate({ title: '商品信息', content: UpdateComponent }) update: ({ commodityInfo: object }?) => void;

  @ModifyData('/commodity/removeCommodity') delete: (id: number) => void;
  
  changeStatus(id, status) {
    this.http.post('/commodity/setStatus', { id, status }).then(res => this.listPage.eaTable._request())
  }

  changeDafulat(id, defaultTag) {
    this.http.post('/commodity/setDefaultTag', { id, defaultTag }).then(res => this.listPage.eaTable._request())
  }

}
