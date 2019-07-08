import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.less']
})
export class TeacherComponent implements OnInit {
  domain = environment.domain;
  domainyeqs:string = environment.domainYeqs;
  isTeacher: any = "";

  teacherList: any = [];
  startDate: any = '';
  endDate: any = "";
  dataSet: any = "";
  Tuesday: any = "";
  Wednesday: any = "";
  Thursday: any = "";
  Friday: any = "";
  Saturday: any = "";
  dateIndex: any = 0;
  formList: any = [];
  mobilePhone: any = '';
  memberName: any = '';
  tablecurr: any = 0;
  currformList: any = "";
  member: any = {};
  tabv: boolean = false;
  dateList: any = [];
  startDateList: any = '';
  endDateList: any = '';

  TuesdayList: any = '';
  WednesdayList: any = '';
  ThursdayList: any = '';
  FridayList: any = '';
  SaturdayList: any = '';

  startDateLists: any = '';
  endDateLists: any = '';
  TuesdayLists: any = '';
  WednesdayLists: any = '';
  ThursdayLists: any = '';
  FridayLists: any = '';
  SaturdayLists: any = '';
  listMap: any[] = [];
  showPageNum: number = 1;
  showTotal: number;
  constructor(
    private http: HttpService,
    private message: NzMessageService

  ) {
    this.selectEmployee();
    this.nowDate();
    this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/intelligent/selectScour', {}, false).then(res => {
      this.dateList = res.result.list;
    });
  }
  tabcurr(i) {
    this.tablecurr = i;
  }
  nowDate() {
    this.dateIndex = 0;
    this.datefun(0);
    if (this.tablecurr == 0) {
      if (this.isTeacher != "") {
        this.queryList();
      }
    } else {
      this.squeryList();
    }
  };
  prveDate() {
    this.dateIndex--;
    this.datefun(this.dateIndex * 7);
    if (this.tablecurr == 0) {
      this.queryList();
    } else {
      this.squeryList();
    }
  };
  nextDate() {
    this.dateIndex++;
    this.datefun(this.dateIndex * 7);
    if (this.tablecurr == 0) {
      this.queryList();
    } else {
      this.squeryList();
    }
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
  };
  selectEmployee() {
    this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/scheduling/selectEmployee', {}, false).then(res => {
      if (res.code == 1000) {
        this.teacherList = res.result.list;
      }
    });
  };
  showWeekFirstDay(i) {
    var day3 = new Date();
    day3.setTime(day3.getTime() + i * 24 * 60 * 60 * 1000);
    let Month = (day3.getMonth() + 1) < 10 ? '0' + (day3.getMonth() + 1) : (day3.getMonth() + 1);
    let dayDate = (day3.getDate()) < 10 ? '0' + (day3.getDate()) : (day3.getDate());
    var s3 = day3.getFullYear() + "-" + Month + "-" + dayDate;
    return s3;
  }
  queryList() {
    if (this.isTeacher == "") {
      this.message.create('error', '请选择主教老师');
      return false;
    }
    let paramJson: any = JSON.stringify({
      startDate: this.startDate,
      endDate: this.endDate,
      employeeId: this.isTeacher
    });
    this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/curriculum/selectTeacher', { paramJson }, false).then(res => {
      if (res.code == 1000) {
        this.formList = res.result.list;
        let startDateList = [],
          endDateList = [],
          TuesdayList = [],
          WednesdayList = [],
          ThursdayList = [],
          FridayList = [],
          SaturdayList = [];
        this.formList.map(item => {
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
        this.formList = [];
      }
    });
  };
  squeryList() {
    let isMobile = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
    if (!isMobile.test(this.mobilePhone) && !this.memberName) {
      this.message.create('error', '请输入正确的手机号或学员姓名');
      return false;
    }
    let paramJson: any = JSON.stringify({
      startDate: this.startDate,
      endDate: this.endDate,
      mobilePhone: this.mobilePhone,
      memberName: this.memberName
    });
    this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/curriculum/selectMemberReserve', { paramJson }, false).then(res => {
      if (res.code == 1000) {
        this.currformList = res.result.list;
        this.member = res.result.member;
        let startDateLists = [],
          endDateLists = [],
          TuesdayLists = [],
          WednesdayLists = [],
          ThursdayLists = [],
          FridayLists = [],
          SaturdayLists = [];
        this.currformList.map(item => {
          if (item.week == '星期一') {
            startDateLists.push(item);
          } else if (item.week == '星期二') {
            TuesdayLists.push(item);
          } else if (item.week == '星期三') {
            WednesdayLists.push(item);
          } else if (item.week == '星期四') {
            ThursdayLists.push(item);
          } else if (item.week == '星期五') {
            FridayLists.push(item);
          } else if (item.week == '星期六') {
            SaturdayLists.push(item);
          } else if (item.week == '星期日') {
            endDateLists.push(item);
          }
        })
        this.startDateLists = startDateLists;
        this.endDateLists = endDateLists;
        this.TuesdayLists = TuesdayLists;
        this.WednesdayLists = WednesdayLists;
        this.ThursdayLists = ThursdayLists;
        this.FridayLists = FridayLists;
        this.SaturdayLists = SaturdayLists;
      } else {
        this.currformList = [];
        this.member = {};
      }
    });
  }
  /**************/
  export(status) {
    let paramJson = {};
    if (status == 2) {
      if (this.isTeacher == "") {
        this.message.create('error', '请选择主教老师');
        return false;
      }
      paramJson = JSON.stringify({
        startDate: this.startDate,
        endDate: this.endDate,
        employeeId: this.isTeacher,
        status: status
      });

    } else {
      let isMobile = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
      if (!isMobile.test(this.mobilePhone)) {
        this.message.create('error', '请输入正确的手机号');
        return false;
      }
      paramJson = JSON.stringify({
        startDate: this.startDate,
        endDate: this.endDate,
        mobilePhone: this.mobilePhone,
        status: status,

      });
    }
    window.open(`${this.domain}/curriculum/poiExcel?paramJson=${paramJson}`);
  }
  //列表展示
  listshow() {
    this.listMap = [];
    let isMobile = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
    if (!isMobile.test(this.mobilePhone) && !this.memberName) {
      this.message.create('error', '请输入正确的手机号或学员姓名');
      return false;
    }
    let paramJson: any = JSON.stringify({
      mobilePhone: this.mobilePhone,
      memberName: this.memberName
    });
    this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/curriculum/memberReserveList', { paramJson, pageSize: 50, pageNum: this.showPageNum }, false).then(res => {
      if (res.code == 1000) {
        res.result.list.map(item => {
          item.week = this.getWeek(item.currentDate);
        })
        this.showTotal = res.result.count;
        this.listMap = res.result.list;
      }
    });
  }
  //获取今天星期几
  getWeek(dateString) {
    let date;
    if (this.isNull(dateString)) {
      date = new Date();
    } else {
      let dateArray: any = dateString.split("-");
      let dates: any = dateArray[1];
      date = new Date(dateArray[0], dates - 1, dateArray[2]);
    }
    return "星期" + "日一二三四五六".charAt(date.getDay());
  }
  isNull(object) {
    if (object == null || typeof object == "undefined") {
      return true;
    }
    return false;
  };

  ngOnInit() {
  }

}
