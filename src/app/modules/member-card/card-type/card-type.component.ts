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

  @ViewChild('drawerContainer', {read: ViewContainerRef}) container: ViewContainerRef;
  componentRef: ComponentRef<any>;

  queryNode = [
    {
      label       : '业务类型',
      key         : 'categoryId',
      type        : 'select',
      optionsUrl  : '/cardBusinessManagement/list'
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

  constructor(
    private http: HttpService,
    private modal: NzModalService,
    private resolver: ComponentFactoryResolver
  ) { 
  }

  ngOnInit() {
  }

  updateCardType(id) {
    this.showDrawer = true;
    this.container.clear();
    const factory: ComponentFactory<AddComponent> = this.resolver.resolveComponentFactory(AddComponent);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.id = id;
  }

  saveDrawer() {
    
  }
  operation(id, type) {
    this.modal.confirm({
      nzTitle: `<i>您确定要${type === 'delete' ? '删除' : '禁用'}此业务类型吗?</i>`,
      nzContent: `<b>${type === 'delete' ? '删除' : '禁用'}此业务类型</b>`,
      nzOnOk: () => console.log('OK')
    });
  }

}
