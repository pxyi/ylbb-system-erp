import { AppointDetailComponent } from './appoint-detail/appoint-detail.component';
import { AddapointComponent } from './addapoint/addapoint.component';
import { NzDrawerService } from 'ng-zorro-antd';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { AppState } from './../../core/reducers/reducers-config';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('BreadcrumbTmpt') BreadcrumbTmpt: TemplateRef<any>;

  /* ---------- 活动集合 ---------- */
  activityLoading: boolean = true;
  activityList: any[] = [];

  /* ----------- 周集合 ----------- */
  weekList: any[] = [];

  constructor(
    private store: Store<AppState>,
    private http: HttpService,
    private drawer: NzDrawerService
  ) {
    /* ----------------- 获取活动集合 ----------------- */
    this.http.post('/homePage/getShopMessageList', {}, false).then(res => {
      this.activityLoading = false;
      this.activityList = res.result;
    });
    /* ------------------ 获取周集合 ------------------ */
    this.http.post('/homePage/getWeeks', {}, false).then(res => {
      this.weekList = res.result;
    });

    this.birthdayChange();
  }

  todayTask;

  ngOnInit() {
    this.store.dispatch({ type: 'setBreadcrumb', payload: this.BreadcrumbTmpt });

    this.http.post('/homePage/showHomePage', {}, false).then(res => this.todayTask = res.result);
  }

  /* ------------------ 日期改变 => 获取生日 ------------------ */
  birthdayLoading: boolean;
  birthdayList: any[] = [];
  selectedIndex: number = 0;
  birthdayChange(e?) {
    this.birthdayLoading = true;
    this.http.post('/homePage/getBirthdayRemind', { type: e ? e.index + 1 : 1 }, false).then(res => {
      this.birthdayList = res.result;
      this.birthdayLoading = false;
    }).catch(err => this.birthdayLoading = false);
  }

  /* ------------------ 预约日期改变 ------------------ */
  appointmentChange(e) {
    this.getReserveCount(this.weekList[e.index].date);
    this.getReserveDetail(this.weekList[e.index].date);
  }

  /* ------------------ 获取预约数量信息 ------------------ */
  reserveCount = null;
  getReserveCount(reserveDate) {
    this.http.post('/homePage/reserveRecordCount', { paramJson: JSON.stringify({ reserveDate }) }, false).then(res => this.reserveCount = res.result);
  }

  /* ------------------ 获取预约详情 ------------------ */
  reserveDetail = { teachers: [], list: [] };
  appointmentLoading: boolean;
  getReserveDetail(reserveDate) {
    this.appointmentLoading = true;
    this.http.post('/homePage/reserveRecordList', { paramJson: JSON.stringify({ reserveDate }) }, false).then(res => {
      this.reserveDetail = res.result;
      this.appointmentLoading = false;
    }).catch(err => this.appointmentLoading = false);
  }


  /* ------------------ 新增预约 ------------------ */
  addAppoint(swimTeacherId, reserveHour) {
    const drawer = this.drawer.create({
      nzTitle: '新增预约记录',
      nzWidth: 720,
      nzContent: AddapointComponent,
      nzContentParams: { reserveInit: { swimTeacherId, reserveHour, reserveDate: this.weekList[this.selectedIndex].date } }
    });
    drawer.afterClose.subscribe(res => {
      if (res) {
        this.appointmentChange({ index: this.selectedIndex });
      }
    });
  }

  /* ------------------ 查看预约详情 ------------------ */
  previewAppoint(appointInfo) {
    const drawer = this.drawer.create({
      nzTitle: '预约详情',
      nzWidth: 720,
      nzContent: AppointDetailComponent,
      nzContentParams: { appointInfo }
    });
    drawer.afterClose.subscribe(res => {
      if (res) {
        this.appointmentChange({ index: this.selectedIndex });
      }
    });
  }

}
