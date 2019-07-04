import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateComponent } from '../create/create.component';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { NzDrawerService, NzMessageService } from 'ng-zorro-antd';
import { TableComponent } from 'src/app/ng-relax/components/table/table.component';
import { PreviewComponent } from './preview/preview.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

  @ViewChild('table') table: TableComponent;

  teacherList: any[] = [];

  constructor(
    private http: HttpService,
    private drawer: NzDrawerService,
    private message: NzMessageService
  ) {
    this.http.post('/yeqs/member/getStoreTeachers').then(res => this.teacherList = res.result);
  }

  ngOnInit() {
  }

  preview(activityInfo) {
    this.drawer.create({
      nzWidth: 960,
      nzContent: PreviewComponent,
      nzContentParams: { activityInfo }
    });
  }
  setSoldOut(id) {
    this.http.post('/activity/setSoldOut', { id }).then(res => this.table._request());
  }

  update(activityId) {
    const drawer = this.drawer.create({
      nzWidth: 720 + 400,
      nzClosable: false,
      nzContent: CreateComponent,
      nzContentParams: { activityId }
    });
    drawer.afterClose.subscribe(res => res && this.table._request());
  }

  showCreateQrcode: boolean;
  activityId: number;
  templateId: number;
  templateUrl: string;
  storeId: number;

  copyShortUrl(e) {
    e.select();
    document.execCommand('Copy');
    this.message.success('已复制到剪切板~！');
  }

}
