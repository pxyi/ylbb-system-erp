import { TableComponent } from './../../../ng-relax/components/table/table.component';
import { AddComponent } from './add/add.component';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-card-type',
  templateUrl: './card-type.component.html',
  styleUrls: ['./card-type.component.scss']
})
export class CardTypeComponent implements OnInit {

  @ViewChild('table') table: TableComponent;

  @ViewChild('drawerContainer', {read: ViewContainerRef}) container: ViewContainerRef;
  componentRef: ComponentRef<any>;

  queryNode = [
    {
      label       : '业务类型',
      key         : 'categoryId',
      type        : 'select',
      optionsUrl  : '/cardBusinessManagement/findList'
    },
    {
      label       : '卡类型状态',
      key         : 'feeType',
      type        : 'select',
      options     : [ { name: '启用', id: 0}, { name: '禁用', id: -1} ]
    },
    {
      label       : '类型名称',
      key         : 'name',
      type        : 'input'
    }
  ];

  showDrawer: boolean;
  saveLoading: boolean;

  constructor(
    private http: HttpService,
    private modal: NzModalService,
    private resolver: ComponentFactoryResolver
  ) { 
  }

  ngOnInit() {
  }

  updateCardType(data: any = {}) {
    this.showDrawer = true;
    this.container.clear();
    const factory: ComponentFactory<AddComponent> = this.resolver.resolveComponentFactory(AddComponent);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.id = data.id;
    data && (this.componentRef.instance.cardTypeInfo = data);
  }

  saveDrawer() {
    this.saveLoading = true;
    this.componentRef.instance.save().then(res => {
      this.saveLoading = false;
      if (res) {
        this.showDrawer = false;
        this.table._request();
      }
    });
  }
  operation(id, type, status?) {
    this.modal.confirm({
      nzTitle: `<i>您确定要${type === 'delete' ? '删除' : status == 0 ? '禁用' : '启用'}此卡类型吗?</i>`,
      nzContent: `<b>${type === 'delete' ? '删除' : status == 0 ? '禁用' : '启用'}此卡类型</b>`,
      nzOnOk: () => {
        let params: any = { id };
        if (type === 'disable') {
          params.status = status == 0 ? 1 : 0;
        }
        this.http.post(`/cardTypeManagement/${type === 'delete' ? 'remove' : 'disable'}`, {
          paramJson: JSON.stringify(params)
        }).then(res => {
          this.table._request();
        })
      }
    });
  }

}
