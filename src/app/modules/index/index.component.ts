import { AppointDetailComponent } from './appoint-detail/appoint-detail.component';
import { AddapointComponent } from './addapoint/addapoint.component';
import { NzDrawerService, NzMessageService } from 'ng-zorro-antd';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { AppState } from './../../core/reducers/reducers-config';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {

  /* ---------- 活动集合 ---------- */
  activityLoading: boolean = true;
  radioValue1: String = 'A';
  radioValue2: String = 'A';
  startDateList: any[] = [];
  endDateList: any[] = [];
  TuesdayList: any[] = [];
  WednesdayList: any[] = [];
  ThursdayList: any[] = [];
  FridayList: any[] = [];
  SaturdayList: any[] = [];
  dateList: any[] = [];
  dateIndex: any = 0;

  startDate: String;
  endDate: String;
  dataSet: String;
  Tuesday: String;
  Wednesday: String;
  Thursday: String;
  Friday: String;
  Saturday: String;
  weekLists: any[] = [];
  monthList: any[] = [];
  monthStartDate: String;
  monthStartDatezw: String;
  activityList: any;
  weekList : any[];
  constructor(
    private store: Store<AppState>,
    private http: HttpService,
    private drawer: NzDrawerService,
    private message: NzMessageService,
    private router: Router
  ) {
    /* ----------------- 获取活动集合 ----------------- */
    this.http.post('/homePage/getShopMessageList').then(res => {
      this.activityLoading = false;
      this.activityList = res.result;
    });
    /* ------------------ 获取周集合 ------------------ */
    this.http.post('/homePage/getWeeks').then(res => {
      this.weekList = res.result;
      this.appointmentChange({ index: this.selectedIndex });
    });

    this.birthdayChange();

    /*********** 初始化获取课表 ************* */
    this.nowDate();
    //查询当前月日期
    let date = new Date();
    let month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
    this.monthStartDate = date.getFullYear() + '-' + month;
    this.monthStartDatezw = date.getFullYear() + '年' + month + '月';
    this.selectmonth(this.monthStartDate);
    this.http.post('/yeqs/intelligent/selectScour', {}, false).then(res => {
      this.dateList = res.result.list;
    });

  }
  todayTask;
  userInfo;
  ngOnInit() {
    this.http.post('/homePage/showHomePage').then(res => this.todayTask = res.result);

    this.store.select('userInfoState').subscribe(res => {
      this.userInfo = res;
    });
  }
  routerLink(link) {
    if (this.userInfo.roleAllowPath.indexOf('**') > -1 || this.userInfo.roleAllowPath.indexOf(link) > -1) {
      this.router.navigateByUrl(link);
    } else {
      this.message.warning('您暂无访问权限');
    }
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

   /*---------------课表------------------*/
   nowDate() {
    this.dateIndex = 0;
    this.datefun(0);

  };
  prveDate() {
    this.dateIndex--;
    this.datefun(this.dateIndex * 7);

  };
  nextDate() {
    this.dateIndex++;
    this.datefun(this.dateIndex * 7);
  };
  datefun(index) {
    let now: any = new Date();
    let nowDayOfWeek = now.getDay();
    nowDayOfWeek = nowDayOfWeek == 0 ? 7 : nowDayOfWeek;
    this.startDate = this.showWeekFirstDay(1 - nowDayOfWeek + index);
    this.Tuesday = this.showWeekFirstDay(2 - nowDayOfWeek + index);
    this.Wednesday = this.showWeekFirstDay(3 - nowDayOfWeek + index);
    this.Thursday = this.showWeekFirstDay(4 - nowDayOfWeek + index);
    this.Friday = this.showWeekFirstDay(5 - nowDayOfWeek + index);
    this.Saturday = this.showWeekFirstDay(6 - nowDayOfWeek + index);
    this.endDate = this.showWeekFirstDay(7 - nowDayOfWeek + index);
    this.getDayListquery1();
  };
  showWeekFirstDay(i) {
    let that = this;
    var day3 = new Date();
    day3.setTime(day3.getTime() + i * 24 * 60 * 60 * 1000);
    let Month = (day3.getMonth() + 1) < 10 ? '0' + (day3.getMonth() + 1) : (day3.getMonth() + 1);
    let dayDate = (day3.getDate()) < 10 ? '0' + (day3.getDate()) : (day3.getDate());
    var s3 = day3.getFullYear() + "-" + Month + "-" + dayDate;
    return s3;
  }
  getDayListquery1() {
    let startDate = this.startDate;
    let endDate = this.endDate;
    this.http.post('/yeqs/curriculum/dailySchedule', { startDate, endDate }, false).then(res => {
      if (res.code == 1000) {
        this.weekLists = res.result.list
        let startDateList = [],
          endDateList = [],
          TuesdayList = [],
          WednesdayList = [],
          ThursdayList = [],
          FridayList = [],
          SaturdayList = [];
        this.weekLists.map(item => {
          if (item.week == '星期一') {
            startDateList.push(item);
          } else if (item.week == '星期二') {
            TuesdayList.push(item);
          } else if (item.week == '星期三') {
            WednesdayList.push(item);
          } else if (item.week == '星期四') {
            ThursdayList.push(item);
          } else if (item.week == '星期五') {
            FridayList.push(item);
          } else if (item.week == '星期六') {
            SaturdayList.push(item);
          } else if (item.week == '星期日') {
            endDateList.push(item);
          }
        })
        this.startDateList = startDateList;
        this.endDateList = endDateList;
        this.TuesdayList = TuesdayList;
        this.WednesdayList = WednesdayList;
        this.ThursdayList = ThursdayList;
        this.FridayList = FridayList;
        this.SaturdayList = SaturdayList;
      } else {
        this.message.create('error', res.info);
      }
    });
  }
  prveMoth() {
    let monthStartDate = [];
    let startYear:any = this.monthStartDate.split('-')[0];
    let monthMonth:any = this.monthStartDate.split('-')[1];
    monthMonth = monthMonth - 1;
    if (monthMonth <= 0) {
      monthMonth = 12;
      startYear = startYear - 1;
    }
    monthMonth = monthMonth >= 10 ? monthMonth : '0' + monthMonth;
    this.monthStartDate = startYear + '-' + monthMonth;
    this.monthStartDatezw = startYear + '年' + monthMonth + '月';
    this.selectmonth(this.monthStartDate);
  }
  nextMoth() {
    let monthStartDate = [];
    let startYear:any = this.monthStartDate.split('-')[0];
    let monthMonth:any = this.monthStartDate.split('-')[1];
    monthMonth = Number(monthMonth) + 1;
    if (monthMonth >= 13) {
      monthMonth = 1;
      startYear = Number(startYear) + 1;
    }
    monthMonth = monthMonth >= 10 ? monthMonth : '0' + monthMonth;
    this.monthStartDate = startYear + '-' + monthMonth;
    this.monthStartDatezw = startYear + '年' + monthMonth + '月';
    this.selectmonth(this.monthStartDate);
  }
  selectmonth(startDate) {
    this.getmonthList(startDate + '-' + '01');
    this.http.post('/yeqs/curriculum/weeklyTimetable', { startDate }, false).then(res => {
      if (res.code == 1000) {
        let result = res.result.list;
        result.map(item => {
          let Day = item.currentDate.split('-')[2];
          this.monthList.map((items, indexs) => {
            if (Number(items.num) == Day) {
              this.monthList[indexs].list.push(item);
            }
          })
        })

      } else {
        this.message.create('error', res.info);
      }
    });
  }
  getmonthList(dates) {
    this.monthList = [];
    let daynum = this.get_month_date(dates);
    let myDate = new Date(Date.parse(dates));
    let getDay = myDate.getDay();
    let sdaynum = 2;
    for (let i = -(getDay - 1); i < daynum; i++) {
      let unNum = 0;
      let monJson = {
        num: i + 1,
        list: []
      }
      this.monthList.push(monJson);
    }
  }
  get_month_date(dates) {
    var oDate = new Date(Date.parse(dates));
    oDate.setMonth(oDate.getMonth());
    oDate.setMonth(oDate.getMonth() + 1);
    oDate.setDate(1);
    oDate.setMonth(oDate.getMonth());
    oDate.setDate(0);
    return oDate.getDate();
  }  
}



