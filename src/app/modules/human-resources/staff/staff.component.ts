import { UploadComponent } from './upload/upload.component';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { NzModalService, NzMessageService, NzDrawerService } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryNode } from 'src/app/ng-relax/components/query/query.component';
import { ListPageComponent } from 'src/app/ng-relax/components/list-page/list-page.component';
import { UpdateComponent } from './update/update.component';
import { ModifyData } from 'src/app/ng-relax/decorators/list/modify.decorator';
import { DrawerCreate } from 'src/app/ng-relax/decorators/drawer/create.decorator';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.less']
})
export class StaffComponent implements OnInit {

  queryNode: QueryNode[] = [
    {
      label: '员工姓名',
      key: 'name',
      type: 'input'
    },
    {
      label: '员工手机',
      key: 'mobile',
      type: 'input'
    },
    {
      label: '状态',
      key: 'state',
      type: 'select',
      options: [{ name: '全职', id: '全职' }, { name: '离职', id: '离职' }]
    },
    {
      label: '服务区域',
      key: 'serviceArea',
      type: 'select',
      options: [{ name: '婴儿区', id: 1 }, { name: '幼儿区', id: 2 }, { name: '兼顾', id: 3 }]
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

  @DrawerCreate({ title: '员工信息', content: UpdateComponent }) updateDrawer: ({ staffInfo: object }?) => void;

  update() {
    if (this.checkedItems.length) {
      this.listPage.eaTable.dataSet.map(staffInfo => staffInfo.id == this.checkedItems[0] && this.updateDrawer({ staffInfo }));
    } else {
      this.message.warning('请选择一条数据');
    }
  }

  reset() {
    if (this.checkedItems.length) {
      this.modal.confirm({
        nzTitle: '<i>确定要重置该员工密码吗?</i>',
        nzContent: '<b>确定要重置该员工密码吗</b>',
        nzOnOk: () => {
          this.http.post('/employee/resetPassword', { id: this.checkedItems[0] }).then(res => { }).catch(err => { })
        }
      });
    } else {
      this.message.warning('请选择一条数据');
    }
  }

  upload() {
    let { http, checkedItems, listPage } = this;
    if (this.checkedItems.length) {
      const uploadModal = this.modal.create({
        nzTitle: '上传头像',
        nzContent: UploadComponent,
        nzFooter: [{
          label: '取消',
          onClick() {
            uploadModal.close();
          }
        }, {
          label: '确定',
          type: 'primary',
          loading: false,
          onClick(componentInstance) {
            if (componentInstance.avatarUrl) {
              this.loading = true;
              http.post('/employee/uploadPhotoUrl', {
                id: checkedItems[0],
                photoUrl: componentInstance.avatarUrl
              }).then(res => {
                this.loading = false;
                uploadModal.close();
                listPage.eaTable._request();
              })
            } else {
              uploadModal.close();
            }
          }
        }]
      })
    } else {
      this.message.warning('请选择一条数据');
    }
  }
  
  @ModifyData('/employee/disableEmployee') disable: (id: number) => void;

  @ModifyData('/employee/enableEmployee') enable: (id: number) => void;

}
