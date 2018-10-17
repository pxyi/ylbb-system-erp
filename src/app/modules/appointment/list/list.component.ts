import { ConsumptionComponent } from './consumption/consumption.component';
import { ListPageComponent } from 'src/app/ng-relax/components/list-page/list-page.component';
import { PreviewComponent } from './preview/preview.component';
import { HttpService } from './../../../ng-relax/services/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryNode } from './../../../ng-relax/components/query/query.component';
import { NzDrawerService } from 'ng-zorro-antd';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @ViewChild('listPage') listPage: ListPageComponent;

  queryNode: QueryNode[] = [
    {
      label       : '会员卡号',
      key         : 'cardCode',
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
      label       : '预约泳师',
      key         : 'reserveTeacherId',
      type        : 'select',
      optionsUrl  : '/member/getStoreTeachers',
      isHide      : true
    },
    {
      label       : '婴儿类型',
      key         : 'babyType',
      type        : 'select',
      options     : [ { name: '婴儿', id: '婴儿' }, { name: '幼儿', id: '幼儿' } ],
      isHide      : true
    },
    {
      label       : '业务类型',
      key         : 'categoryId',
      type        : 'select',
      optionsUrl  : '/cardBusinessManagement/getStoreCardTypeCategores',
      isHide      : true
    },
    {
      label       : '预约状态',
      key         : 'reserveStatus',
      type        : 'select',
      options     : [ { name: '预约中', id: 0 }, { name: '已撤销', id: 1 }, { name: '已完成', id: 2 } ]
    },
    {
      label       : '预约日期',
      key         : 'appointmentDate',
      valueKey    : ['startDate', 'endDate'],
      type        : 'rangepicker',
      ranges      : { 
                      '今天': [new Date(), new Date()], 
                      '明天': [new Date(new Date().getTime() + 60 * 60 * 24 * 1000), new Date(new Date().getTime() + 60 * 60 * 24 * 1000)],
                      '第三天': [new Date(new Date().getTime() + 60 * 60 * 24 * 1000 * 2), new Date(new Date().getTime() + 60 * 60 * 24 * 1000 * 2)],
                      '第四天': [new Date(new Date().getTime() + 60 * 60 * 24 * 1000 * 3), new Date(new Date().getTime() + 60 * 60 * 24 * 1000 * 3)],
                      '第五天': [new Date(new Date().getTime() + 60 * 60 * 24 * 1000 * 4), new Date(new Date().getTime() + 60 * 60 * 24 * 1000 * 4)],
                      '第六天': [new Date(new Date().getTime() + 60 * 60 * 24 * 1000 * 5), new Date(new Date().getTime() + 60 * 60 * 24 * 1000 * 5)],
                      '第七天': [new Date(new Date().getTime() + 60 * 60 * 24 * 1000 * 6), new Date(new Date().getTime() + 60 * 60 * 24 * 1000 * 6)],
                    }
    },
    {
      label       : '预约时段',
      key         : 'appointmentHour',
      valueKey    : ['startHour', 'endHour'],
      type        : 'between',
      isHide      : true
    },
    {
      label       : '只看跨店',
      key         : 'babyType',
      type        : 'select',
      options     : [ { name: '是', id: 1 }, { name: '否', id: 0 } ],
      isHide      : true
    },
    {
      label       : '当天预约',
      key         : 'overdue',
      type        : 'select',
      options     : [ { name: '是', id: 1 }, { name: '否', id: 0 } ],
      isHide      : true
    },
  ]

  constructor(
    private http: HttpService,
    private drawer: NzDrawerService
  ) { }

  ngOnInit() {
  }

  /* ------------------- 查看预约 ------------------- */
  preview(appointmentInfo) {
    const drawerRef = this.drawer.create({
      nzTitle: '预约记录',
      nzContent: PreviewComponent,
      nzWidth: 720,
      nzBodyStyle: {
        'padding-bottom': '53px'
      },
      nzContentParams: {
        appointmentInfo
      }
    });

    drawerRef.afterClose.subscribe(res => res && this.listPage.eaTable._request());
  }

  /* ------------------- 结算预约 ------------------- */
  consumption(appointmentInfo) {
    const drawerRef = this.drawer.create({
      nzTitle: '添加消费',
      nzContent: ConsumptionComponent,
      nzWidth: 720,
      nzBodyStyle: {
        'padding-bottom': '53px'
      },
      nzContentParams: {
        appointmentInfo
      }
    });

    drawerRef.afterClose.subscribe(res => res && this.listPage.eaTable._request());
  }

  /* ------------------- 撤销预约 ------------------- */
  reserveCancel(id) {
    this.http.post('/reserve/cancel', { id }).then(res => this.listPage.eaTable._request());
  }

}
