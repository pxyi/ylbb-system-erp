import { HttpService } from 'src/app/ng-relax/services/http.service';
import { NzModalService, NzMessageService, NzDrawerService } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryNode } from 'src/app/ng-relax/components/query/query.component';
import { ListPageComponent } from 'src/app/ng-relax/components/list-page/list-page.component';
import { UpdateComponent } from './update/update.component';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  queryNode: QueryNode[] = [
    {
      label       : '员工姓名',
      key         : 'name',
      type        : 'input'
    },
    {
      label       : '员工手机',
      key         : 'mobile',
      type        : 'input'
    },
    {
      label       : '状态',
      key         : 'state',
      type        : 'select',
      options     : [ { name: '全职', id: '全职' }, { name: '离职', id: '离职' } ]
    },
    {
      label       : '服务区域',
      key         : 'serviceArea',
      type        : 'select',
      options     : [ { name: '婴儿区', id: 1 }, { name: '幼儿区', id: 2 }, { name: '兼顾', id: 3 } ]
    }
  ]
  
  checkedItems: number[] = [];

  constructor(
    private http: HttpService,
    private modal: NzModalService,
    private drawer: NzDrawerService,
    private message: NzMessageService
  ) { }

  ngOnInit() {
  }

  @ViewChild('listPage') listPage: ListPageComponent;

  showDrawer: boolean;
  saveLoading: boolean;

  saveDrawer() {

  }


  showUpdate() {
    let staffInfo = null;
    if (this.checkedItems.length) {
      this.listPage.eaTable.dataSet.map(res => res.id == this.checkedItems[0] && (staffInfo = res));
    }
    const drawerRef = this.drawer.create({
      nzTitle: '员工信息',
      nzWidth: 720,
      nzContent: UpdateComponent,
      nzBodyStyle: {
        'padding-bottom': '53px'
      },
      nzContentParams: { staffInfo }
    });
    drawerRef.afterClose.subscribe(res => {

    })
  }
  
  update() {
    if (this.checkedItems.length) {
      this.showUpdate();
    } else {
      this.message.warning('请选择一条数据');
    }
  }

  reset () {
    if (this.checkedItems.length) {
      this.modal.confirm({
        nzTitle: '<i>确定要重置该员工密码吗?</i>',
        nzContent: '<b>确定要重置该员工密码吗</b>',
        nzOnOk: () => {
          this.http.post('/employee/resetPassword', { id: this.checkedItems[0] }).then(res => {}).catch(err => {})
        }
      });
    } else {
      this.message.warning('请选择一条数据');
    }
  }

  upload() {
    if (this.checkedItems.length) {
      
    } else {
      this.message.warning('请选择一条数据');
    }
  }

}
