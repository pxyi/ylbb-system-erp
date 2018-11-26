import { DatePipe } from '@angular/common';
import { ConsumptionComponent } from './consumption/consumption.component';
import { ListPageComponent } from 'src/app/ng-relax/components/list-page/list-page.component';
import { PreviewComponent } from './preview/preview.component';
import { HttpService } from './../../../ng-relax/services/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryNode } from './../../../ng-relax/components/query/query.component';
import { NzDrawerService } from 'ng-zorro-antd';
import { FormControl } from '@angular/forms';

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
      type        : 'input',
      isHide      : true
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
      default     : [new Date(), new Date()]
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
      type        : 'radio',
      options     : [ { name: '是', id: 1 }, { name: '否', id: 0 } ],
      isHide      : true
    },
    {
      label       : '当天预约',
      key         : 'overdue',
      type        : 'radio',
      options     : [ { name: '是', id: 1 }, { name: '否', id: 0 } ],
      isHide      : true
    }
  ];

  paramsInit;

  constructor(
    private http: HttpService,
    private drawer: NzDrawerService,
    private format: DatePipe
  ) { 
    this.paramsInit = {
      startDate: this.format.transform(new Date(), 'yyyy-MM-dd'),
      endDate: this.format.transform(new Date(), 'yyyy-MM-dd'),
    };
    this.http.post('/homePage/getWeeks', {}, false).then(res => {
      this.listPage.eaQuery._queryForm.addControl('weilai', new FormControl(null));
      let queryNode: QueryNode = {
        label: '未来几天',
        type: 'radio',
        key: 'weilai',
        options: [],
        multiple: 2,
        optionKey: { label: 'name', value: 'id' }
      }
      res.result.map(item => queryNode.options.push({ name: item.week, id: new Date(item.date)}))
      this.listPage.eaQuery._node.push(queryNode);

      this.listPage.eaQuery._queryForm.get('weilai').valueChanges.subscribe(res => {
        if (res) {
          this.listPage.eaQuery._queryForm.patchValue({ appointmentDate: [res, res] });
          this.listPage.eaQuery._submit();
        }
      })
    });
  }

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
