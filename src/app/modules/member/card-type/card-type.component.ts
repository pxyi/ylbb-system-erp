import { HttpService } from './../../../ng-relax/services/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalService, NzDrawerService } from 'ng-zorro-antd';
import { TableComponent } from 'src/app/ng-relax/components/table/table.component';
import { DrawerCreate } from 'src/app/ng-relax/decorators/drawer/create.decorator';
import { UpdateComponent } from './update/update.component';

@Component({
  selector: 'app-card-type',
  templateUrl: './card-type.component.html',
  styleUrls: ['./card-type.component.less']
})
export class CardTypeComponent implements OnInit {

  @ViewChild('table') table: TableComponent;

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

  constructor(
    private http: HttpService,
    private modal: NzModalService,
    private drawer: NzDrawerService
  ) { }

  ngOnInit() {
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
        }, true).then(res => {
          this.table._request();
        })
      }
    });
  }

  @DrawerCreate({ title: '编辑卡类型', content: UpdateComponent }) update: ({ cardTypeInfo: object }?) => void;

}
