import { DatePipe } from '@angular/common';
import { ConsumptionComponent } from './consumption/consumption.component';
import { ListPageComponent } from 'src/app/ng-relax/components/list-page/list-page.component';
import { PreviewComponent } from './preview/preview.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NzDrawerService, NzModalService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QueryNode } from 'src/app/ng-relax/components/query/query.component';
import { HttpService } from 'src/app/ng-relax/services/http.service';
// import { MemberCardDetailComponent } from '../../public/member-card-detail/member-card-detail.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
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
      optionsUrl  : '/yeqs/member/getStoreTeachers',
      isHide      : true
    },

    {
      label       : '预约日期',
      key         : 'appointmentDate',
      valueKey    : ['startDate', 'endDate'],
      type        : 'rangepicker',
      default     : [new Date(), new Date()]
    },

    {
      label       : '预约状态',
      key         : 'reserveStatus',
      type        : 'select',
      options     : [ { name: '预约中', id: 0 }, { name: '已撤销', id: 1 }, { name: '已完成', id: 2 } ]
    },
  ];

  paramsInit;
  
  weilaiForm: FormGroup;
  weilaiOptionList: any[] = []
  totalPage:any = 0;
  constructor(
    private http: HttpService,
    private drawer: NzDrawerService,
    private format: DatePipe,
    private fb: FormBuilder = new FormBuilder(),
    private modal: NzModalService,
    private routerinfo: ActivatedRoute
  ) { 
    this.paramsInit = {
      startDate: this.format.transform(new Date(), 'yyyy-MM-dd'),
      endDate: this.format.transform(new Date(), 'yyyy-MM-dd'),
    };
    this.weilaiForm = this.fb.group({
      weilai: []
    })
    this.http.post('/homePage/getWeeks', {}, false).then(res => {
      res.result.map(item => this.weilaiOptionList.push({ name: item.week, id: new Date(item.date)}));
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
  routingPath: string;
  ngOnInit() {
    console.log(this.routerinfo)
    this.routingPath = this.routerinfo['_routerState'].snapshot.url;
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
      this.http.post('/reserve/welcome', { id: data.id }).then(res => {})
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

    drawerRef.afterClose.subscribe(res => {
      res && this.listPage.eaQuery._submit();

      if (typeof res === 'object' && res.id) {
        /* ------------------- 如果此用户为会员，则显示本次的消费卡信息 ------------------- */
        // this.http.post('/yeqs/customer/viewCardDateils', { id: res.id }, false).then(res => {
        //   if (res.code == 1000) {
        //     res.result.totalTimes = `${res.result.times + res.result.freeTimes}（${res.result.times}/${res.result.freeTimes}）`;
        //     res.result.remainTimes = `${res.result.remaintimes + res.result.remainFreeTimes}（${res.result.remaintimes}/${res.result.remainFreeTimes}）`
        //     this.modal.create({
        //       nzTitle: '消费完成',
        //       nzContent: MemberCardDetailComponent,
        //       nzComponentParams: { memberInfo: res.result },
        //       nzOkText: null
        //     })
        //   }
        // })
      }
    });
  }

  /* ------------------- 撤销预约 ------------------- */
  reserveCancel(id) {
    this.http.post('/reserve/cancel', { id }).then(res => this.listPage.eaTable._request());
  }

}
