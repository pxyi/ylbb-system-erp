import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {
  domain:string = environment.domain;
  domainyeqs:string = environment.domainYeqs;
  dateArr:any = [];
  dayList:any = [];
  weekList:any = [];
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
  radioValue1:any = 'A';
  radioValue2:any = 'A';
  monthList:any = [];
  monthStartDate:any = '';
  monthStartDatezw:any = "";
  monthDetail:any = 'JY';

  startDateList: any = '';
  endDateList: any = '';
  TuesdayList: any = '';
  WednesdayList: any = '';
  ThursdayList: any = '';
  FridayList: any = '';
  SaturdayList: any = '';
  dateList: any = [];
  studentdata :any =[];
  showListdetail:any = false;
  memberUserDetail:any  = false;
      listDataMap = {
    eight : [
      { type: 'warning', content: 'This is warning event.' },
      { type: 'success', content: 'This is usual event.' }
    ],
    ten   : [
      { type: 'warning', content: 'This is warning event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'error', content: 'This is error event.' }
    ],
    eleven: [
      { type: 'warning', content: 'This is warning event' },
      { type: 'success', content: 'This is very long usual event........' },
      { type: 'error', content: 'This is error event 1.' },
      { type: 'error', content: 'This is error event 2.' },
      { type: 'error', content: 'This is error event 3.' },
      { type: 'error', content: 'This is error event 4.' }
    ]}
  
  constructor(
    private http: HttpService,
    private message: NzMessageService,
    private format: DatePipe, 
  ) {
    this.nowDate();
    //查询当前月日期
    let date = new Date();
    let month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
    this.monthStartDate = date.getFullYear() + '-' + month;
    this.monthStartDatezw = date.getFullYear() + '年' + month +'月';
    this.selectmonth(this.monthStartDate);
    this.http.post( 'yeqs/intelligent/selectScour', {}, false).then(res => {
      this.dateList = res.result.list;
      console.log(this.dateList)
    });  
    setTimeout(() => {
      console.log(this.dateList);
    }, 2000);
    
   }

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
    nowDayOfWeek =  nowDayOfWeek == 0 ? 7 : nowDayOfWeek;
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
    let paramJson: any = JSON.stringify({
      employeeId: 0,
      roomId: 0,
      syllabusName: '',
      startDate: this.startDate,
      endDate: this.endDate
    }); 
    this.http.post( 'yeqs/curriculum/selectCondition', { paramJson }, false).then(res => {
      if (res.code == 1000) {
        this.weekList = res.result
        let startDateList = [],
          endDateList = [],
          TuesdayList = [],
          WednesdayList = [],
          ThursdayList = [],
          FridayList = [],
          SaturdayList = [];
        this.weekList.map(item => {
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
        console.log(startDateList);
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
  getDayListquery(){
    if(!this.dateArr.length){
      this.message.create('error', '日期不能为空'); 
      return false;
    }
      let startDate = this.format.transform(this.dateArr[0], 'yyyy-MM-dd');
      let endDate = this.format.transform(this.dateArr[1], 'yyyy-MM-dd');
    this.http.post( 'yeqs/curriculum/dailySchedule', { startDate, endDate}, false).then(res => {
      if (res.code == 1000) {
        this.dayList = res.result.list
      }else{
        this.message.create('error', res.info); 
      }
    }); 
  }
  tabcurr(index){
  
  }

  prveMoth(){
    let monthStartDate = [];
    let startYear = this.monthStartDate.split('-')[0];
    let monthMonth = this.monthStartDate.split('-')[1];
    monthMonth = monthMonth-1;
    if (monthMonth<=0 ){
      monthMonth = 12;
      startYear = startYear-1;
    }
    monthMonth = monthMonth >= 10 ? monthMonth : '0' + monthMonth;
    this.monthStartDate = startYear + '-' + monthMonth;
    this.monthStartDatezw = startYear + '年' + monthMonth + '月';
    this.selectmonth(this.monthStartDate);
  }
    nextMoth() {
      let monthStartDate = [];
      let startYear = this.monthStartDate.split('-')[0];
      let monthMonth = this.monthStartDate.split('-')[1];
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
  selectmonth(startDate){
    this.getmonthList(startDate + '-' + '01');
    this.http.post( 'yeqs/curriculum/weeklyTimetable', { startDate }, false).then(res => {
      if (res.code == 1000) {
        let result = res.result.list;
        result.map( item=>{
          let Day = item.currentDate.split('-')[2];
          this.monthList.map((items,indexs)=>{
            if (Number(items.num) == Day){
              this.monthList[indexs].list.push(item);
              }
          })
        })
        
      } else {
        this.message.create('error', res.info);
      }
    }); 
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
getmonthList(dates){
  this.monthList = [];
  let daynum = this.get_month_date(dates);
  let myDate = new Date(Date.parse(dates)); 
  let getDay = myDate.getDay();
  let sdaynum = 2;
  for (let i = -(getDay-1); i<daynum; i++ ){
    let unNum = 0;
  let monJson = {
    num:i+1,
    list:[]
  }  
  this.monthList.push(monJson); 
  }
}
  export(status){

    let paramJson = {};
    if(status==0){
      if (!this.dateArr.length) {
        this.message.create('error', '日期不能为空');
        return false;
      }   
    paramJson = JSON.stringify({
      startDate : this.format.transform(this.dateArr[0], 'yyyy-MM-dd'),
      endDate : this.format.transform(this.dateArr[1], 'yyyy-MM-dd'),
      status: status 
    });
  }else{
     paramJson = JSON.stringify({
        startDate: this.startDate,
        endDate: this.endDate,
        status: status
      });
  }
    window.open(`${this.domain}/curriculum/poiExcel?paramJson=${paramJson}`);
  }
  details(data) {
    this.studentdata = data;
    this.showListdetail = true;

  }
  closeListdetail() {
    this.showListdetail = false;
    this.memberUserDetail = false;
  }

  memberUserDetails(memberId) {
    this.http.post( 'yeqs/curriculum/memberIdMsg', {
      memberId
    }, false).then(res => {
      if (res.code == 1000) {
        this.memberUserDetail = res.result[0];
      } else {
        this.message.create('error', res.info);
      }
    });
  }


  ngOnInit() {
  }

}
