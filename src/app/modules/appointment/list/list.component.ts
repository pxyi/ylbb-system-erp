import { DatePipe } from '@angular/common';
import { ListPageComponent } from 'src/app/ng-relax/components/list-page/list-page.component';
import { PreviewComponent } from './preview/preview.component';
import { HttpService } from './../../../ng-relax/services/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryNode } from './../../../ng-relax/components/query/query.component';
import { NzDrawerService, NzModalService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ConsumptionComponent } from '../../public/consumption/consumption.component';
import { DrawerCreate } from 'src/app/ng-relax/decorators/drawer/create.decorator';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

  @ViewChild('listPage') listPage: ListPageComponent;

  queryNode: QueryNode[] = [
    {
      label: '会员卡号',
      key: 'cardCode',
      type: 'input'
    },
    {
      label: '会员姓名',
      key: 'name',
      type: 'input'
    },
    {
      label: '会员小名',
      key: 'nick',
      type: 'input',
      isHide: true
    },
    {
      label: '预约泳师',
      key: 'reserveTeacherId',
      type: 'select',
      optionsUrl: '/yeqs/member/getStoreTeachers',
      isHide: true
    },
    {
      label: '婴儿类型',
      key: 'babyType',
      type: 'select',
      options: [{ name: '婴儿', id: '婴儿' }, { name: '幼儿', id: '幼儿' }],
      isHide: true
    },
    {
      label: '业务类型',
      key: 'categoryId',
      type: 'select',
      optionsUrl: '/yeqs/cardBusinessManagement/getStoreCardTypeCategores',
      isHide: true
    },
    {
      label: '预约日期',
      key: 'appointmentDate',
      valueKey: ['startDate', 'endDate'],
      type: 'rangepicker',
      default: [new Date(), new Date()]
    },
    {
      label: '最小时段',
      key: 'startHour',
      type: 'select',
      options: [
        { name: 0, id: 0 },
        { name: 1, id: 1 },
        { name: 2, id: 2 },
        { name: 3, id: 3 },
        { name: 4, id: 4 },
        { name: 5, id: 5 },
        { name: 6, id: 6 },
        { name: 7, id: 7 },
        { name: 8, id: 8 },
        { name: 9, id: 9 },
        { name: 10, id: 10 },
        { name: 11, id: 11 },
        { name: 12, id: 12 },
        { name: 13, id: 13 },
        { name: 14, id: 14 },
        { name: 15, id: 15 },
        { name: 16, id: 16 },
        { name: 17, id: 17 },
        { name: 18, id: 18 },
        { name: 19, id: 19 },
        { name: 20, id: 20 },
        { name: 21, id: 21 },
        { name: 22, id: 22 },
        { name: 23, id: 23 },
      ],
      isHide: true
    },
    {
      label: '最大时段',
      key: 'endHour',
      type: 'select',
      options: [
        { name: 0, id: 0 },
        { name: 1, id: 1 },
        { name: 2, id: 2 },
        { name: 3, id: 3 },
        { name: 4, id: 4 },
        { name: 5, id: 5 },
        { name: 6, id: 6 },
        { name: 7, id: 7 },
        { name: 8, id: 8 },
        { name: 9, id: 9 },
        { name: 10, id: 10 },
        { name: 11, id: 11 },
        { name: 12, id: 12 },
        { name: 13, id: 13 },
        { name: 14, id: 14 },
        { name: 15, id: 15 },
        { name: 16, id: 16 },
        { name: 17, id: 17 },
        { name: 18, id: 18 },
        { name: 19, id: 19 },
        { name: 20, id: 20 },
        { name: 21, id: 21 },
        { name: 22, id: 22 },
        { name: 23, id: 23 },
      ],
      isHide: true
    },
    {
      label: '预约状态',
      key: 'reserveStatus',
      type: 'select',
      options: [{ name: '预约中', id: 0 }, { name: '已撤销', id: 1 }, { name: '已完成', id: 2 }]
    },
    // {
    //   label       : '只看跨店',
    //   key         : 'babyType',
    //   type        : 'radio',
    //   options     : [ { name: '是', id: 1 }, { name: '否', id: 0 } ],
    //   isHide      : true
    // },
    {
      label: '当天预约',
      key: 'overdue',
      type: 'radio',
      options: [{ name: '是', id: 1 }, { name: '否', id: 0 }],
      isHide: true
    }
  ];

  paramsInit;

  weilaiForm: FormGroup;
  weilaiOptionList: any[] = []

  constructor(
    private http: HttpService,
    private drawer: NzDrawerService,
    private format: DatePipe,
    private fb: FormBuilder = new FormBuilder(),
    private modal: NzModalService
  ) {
    this.paramsInit = {
      startDate: this.format.transform(new Date(), 'yyyy-MM-dd'),
      endDate: this.format.transform(new Date(), 'yyyy-MM-dd'),
    };
    this.weilaiForm = this.fb.group({
      weilai: []
    })
    this.http.post('/homePage/getWeeks').then(res => {
      res.result.map(item => this.weilaiOptionList.push({ name: item.week, id: new Date(item.date) }));
      this.weilaiOptionList[0].name = '今天';
      this.weilaiForm.patchValue({ weilai: this.weilaiOptionList[0].id })
      this.weilaiForm.get('weilai').valueChanges.subscribe(res => {
        if (res) {
          this.isChange = false;
          this.listPage.eaTable.request({ startDate: this.format.transform(res, 'yyyy-MM-dd'), endDate: this.format.transform(res, 'yyyy-MM-dd') })
          this.listPage.eaQuery._queryForm.patchValue({ appointmentDate: [res, res] })
        }
      })
    });
  }

  isChange: boolean = true;

  requestDataLength: number = 0;
  ngOnInit() {
    setTimeout(() => {
      this.listPage.eaQuery._queryForm.get('appointmentDate').valueChanges.subscribe(res => {
        this.isChange && this.weilaiForm.patchValue({ weilai: null });
        this.isChange = true;
      })
    });
  }

  welcome(data) {
    if (!data.isWelcome) {
      data.isWelcome = true;
      this.http.post('/reserve/welcome', { id: data.id }).then(res => { })
    }
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
  @DrawerCreate({ title: '添加消费', content: ConsumptionComponent }) consumption: ({ consumptionInfo: object }) => void;


  /* ------------------- 撤销预约 ------------------- */
  reserveCancel(id) {
    this.http.post('/reserve/cancel', { id }).then(res => this.listPage.eaTable._request());
  }

}
