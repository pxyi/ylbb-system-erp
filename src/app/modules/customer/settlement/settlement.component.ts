import { UpclassComponent } from './upclass/upclass.component';
import { ConsumptionsComponents } from './consumptions/consumptions.component';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd';
import { ListPageComponent } from 'src/app/ng-relax/components/list-page/list-page.component';
import { AppState } from 'src/app/core/reducers/reducers-config';
import { Subject } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-settlement',
  templateUrl: './settlement.component.html',
  styleUrls: ['./settlement.component.scss']
})
export class SettlementComponent implements OnInit {
  @ViewChild('listPage') listPage: ListPageComponent;
  setNum:number = 3;
  insetStatus: number;
  searchSubject = new Subject();
  isBtnDisVled = true;
  modal_visit: boolean;
  checked1:any = false;
  checked2: any = false;
  checked3: any = false;
  checked4:any = false;
  checked5: any = false;
  checked6: any = false;
  checked7: any = false;
  tableList:any = [];
  teacherList:any = [];
  classRoomList:any = [];
  employeeId:any = 0;
  roomId: any = 0;
  syllabusName: any = '';  
  dateIndex: any = 0;  
  startDate: any = '';
  endDate: any = '';
  isOkLoading:any = false;
  Tuesday:any = '';
  Wednesday :any = '';
  Thursday :any = '';
  Friday :any = '';
  Saturday :any = '';
  courseNames:any = "";
  passwindow :any= false; 

  startDateList: any = '';
  endDateList: any = '';

  TuesdayList: any = '';
  WednesdayList: any = '';
  ThursdayList: any = '';
  FridayList: any = '';
  SaturdayList: any = '';

  buttonStatus: boolean  = false;
  isrepeat:any = false;
  nowtime: any = '';
  cardNumber:any = '';
  showstudentsForm:any = false;
  showListdetail: boolean = false;
  showRecord: boolean = false;
  mobilePhone:any = '';
  showName: any = '';
  showroomName:any = '';
  showemployeeName:any = '';
  studentdata:any = '';
  showAdjust:any = false;
  nowstartDate:any = '';
  nowendDate:any = '';
  showmodelts:any = false;
  memberName:any = '';
  callcurrentDate:any = '';
  SyllabusAllList:any = []; 
  radioValue:any = '';
  RecordList:any = [];
  RecordList1: any = [];
  RecordList2: any = [];
  RecordList3: any = [];
  RecordList4: any = [];
  RecordList5: any = [];
  RecordList6: any = [];
  RecordList7: any = [];  
  showStopcard:any = false;
  stopcardMemberdetail:any = {};
  memberdetailTk:any = {};
  memberdetailTks:any = {};

  datalabelList:any = [];
  dateList:any = [];
  removeRecordData:any = {};
  memberList_b: any = [];
  memberUserDetail:any = { memberId:0 };
  memberdetail:any = {
    name: '',
    parentName: '',
    birthday: '',
    sex: '',
    havacard: '',
  };
  studentInformation:any = {
    name:'',
    parentName:'',
    birthday:'',
    sex:'',
    havacard:'',
    mobilePhone:'',
    remarks:'',
    status: 0
  }
  storeId:any = "";
  loading_b:any = false;
  total_b: any = "";
  pageIndex_b:any = 1;
  pageSize_b:any = 10;
  remarks:any = "";
  tkstartDate:string = null;
  tkendDate:string = null;

  constructor(

    private http: HttpService,
    private message: NzMessageService,
    private store: Store<AppState>,
    private format: DatePipe,
    private drawer: NzDrawerService,
    private router: Router
  ) {
    this.store.select('userInfoState').subscribe(res => { this.storeId = res.store['id']; }); 
    this.seletdataList();
    this.nowDate();
    this.selectSyllabusAll();
    let dates =  new Date(); 
    let Month = (dates.getMonth() + 1) < 10 ? '0' + (dates.getMonth() + 1) : (dates.getMonth() + 1);
    let dayDate = (dates.getDate()) < 10 ? '0' + (dates.getDate()) : (dates.getDate());
    let years  = dates.getFullYear()+'';
    this.nowtime = years + Month + dayDate;
   
  }
seletdataList(){
  this.http.post('/yeqs/scheduling/selectEmployee', {}, false).then(res => {
    this.teacherList = res.result.list;
  });
  this.http.post('/yeqs/intelligent/selectScour', {}, false).then(res => {
    this.dateList = res.result.list;
  });  
  
  this.http.post('/yeqs/scheduling/selectSchedulingAll', {}, false).then(res => {
    this.classRoomList = res.result.list;
  });  
}
selectquery(){
  let paramJson: any = JSON.stringify({
    employeeId: this.employeeId,
    roomId: this.roomId,
    syllabusName: this.syllabusName,
    startDate: this.startDate,
    endDate: this.endDate
  });
  this.http.post('/yeqs/curriculum/selectCondition', { paramJson }, false).then(res => {
    this.tableList = res.result;
    this.tableList.map( (item,index)=>{
      item.sbnum = 0;
      item.member.map( (items,indexs)=>{
        if (items.expireDate){
        let expireDatearr = items.expireDate.split('-');
        let expireDatestr = expireDatearr[0] + expireDatearr[1] + expireDatearr[2];
        this.tableList[index].member[indexs].expireDate = expireDatestr;
        }
        if(items.reserveStatus != 2){
          item.sbnum ++;
        }
      })
      
    })
    let startDateList = [],
    endDateList = [],
    TuesdayList = [],
    WednesdayList = [],
    ThursdayList = [],
    FridayList = [],
    SaturdayList = [];
    this.tableList.map( item => {
        if( item.week == '星期一' ){
          startDateList.push(item);
        } else if ( item.week == '星期二' ){
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
  });
}
  datefun(index) {
    if (this.dateIndex == 0){
        this.isBtnDisVled = true;
    }else{
        this.isBtnDisVled = false;
    }
    let now: any = new Date();
    let nowDayOfWeek = now.getDay();
    nowDayOfWeek =  nowDayOfWeek == 0 ? 7 : nowDayOfWeek;
    this.startDate = this.showWeekFirstDay(1 - nowDayOfWeek + index);
    this.Tuesday = this.showWeekFirstDay(2 - nowDayOfWeek + index);;
    this.Wednesday = this.showWeekFirstDay(3 - nowDayOfWeek + index);;
    this.Thursday = this.showWeekFirstDay(4 - nowDayOfWeek + index);;
    this.Friday = this.showWeekFirstDay(5 - nowDayOfWeek + index);;
    this.Saturday = this.showWeekFirstDay(6 - nowDayOfWeek + index);;
    this.endDate = this.showWeekFirstDay(7 - nowDayOfWeek + index);
    this.tkstartDate = this.tkstartDate ? this.tkstartDate : this.startDate ;
    this.tkendDate = this.tkendDate ? this.tkendDate : this.endDate ;
    this.selectquery();
    if (!this.nowstartDate){
    this.nowstartDate = this.startDate;
    this.nowendDate = this.endDate
    }
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
  nowDate() {
    this.dateIndex = 0;
    this.datefun(0);
    
  };
  nextDate() {
    this.dateIndex++;
    this.datefun(this.dateIndex * 7);
  };
  prveDate(){
    if (this.dateIndex>0){
      this.dateIndex--;
      this.datefun(this.dateIndex * 7);
    }
  };
  ngOnInit() {
    this.searchSubject.pipe(debounceTime(500), filter((txt: string) => txt.length >= 1)).subscribe(res => {

    if ((isNaN(this.mobilePhone) && this.mobilePhone!="" || (!isNaN(this.mobilePhone) && this.mobilePhone.length > 3)) ){
      this.loading_b = true; 
      this.http.get(environment.domainEs + '/es/erp/query', { index: 'bss', storeId: this.storeId, type: 'member', condition: this.mobilePhone, pageNo:this.pageIndex_b, pageSize:10 }, false).then(res => {
      this.loading_b = false;
        if (res['returnCode'] == 'SUCCESS') {
        if(res.result){
          this.memberList_b = res.result;
          this.total_b = res['total'];
        }else{
          this.memberList_b = [];
          this.total_b = 0;
          this.pageIndex_b = 1;
        }
        } else {
          this.message.create('error', res['returnMsg']);
        }
      });
    }else{
      this.memberList_b =[];
      this.total_b = 0;
      this.pageIndex_b = 1;
    }
    })
  }

  memberUserDetails(memberId){
    this.http.post('/yeqs/curriculum/memberIdMsg', {
      memberId
    }, false).then(res => {
      this.isOkLoading = false;
      if (res.code == 1000) {
        
        this.memberUserDetail = res.result[0];
      } else {
        this.message.create('error', res.info);
      }
    }); 
  }

  //查询是不是卡次已满
  selectCardNum(memberId){
    let paramJson = JSON.stringify({
      syllabusName: this.studentdata.name,
      currentDate: this.studentdata.currentDate,
      startTime: this.studentdata.startTime,
      endTime: this.studentdata.endTime,
      roomName: this.studentdata.roomName,
      employeeId: this.studentdata.employeeId,
      id: this.studentdata.id
    });
    this.http.post('/yeqs/curriculum/meetCondition', {
        paramJson,
        memberId
      
    }, false).then(res => {
      if (res.code == 1000) {
          this.insetStatus  = 0;
      }else if(res.code == 1012){
          this.insetStatus = 1;
      }else if(res.code == 1000){    
        this.insetStatus = 3;
      } else { 
        this.message.create('error', res.info);
      }
    });    
  }

  //查询弹框
  showstudents(data){
    this.studentInformation = {
      name: '',
      parentName: '',
      birthday: '',
      sex: '',
      havacard: '',
      mobilePhone: '',
      remarks:'',
      status: 0
    };
    this.mobilePhone = '';
    this.showstudentsForm = true;
    this.showName = data.name;
    this.showroomName = data.roomName;
    this.showemployeeName = data.employeeName;
    this.studentdata = data;
  }
  closestudentsForm(){
    this.showstudentsForm = false;
    this.buttonStatus = false;
    this.memberList_b = [];
    this.total_b = 0;
    this.pageIndex_b = 1;    
  }
  isstudentsForm(){
    if(!this.studentdata.status){
    if(this.insetStatus == 3){
      this.message.create('error', '同一节课不能添加同一个学员！');
    }else if(this.insetStatus == 0){
      this.lsInstall();
      this.modal_visit = true;
      let set;
      set = setInterval(item=>{
        if(this.setNum > 1){
          this.setNum --;
        } else{
          clearInterval(set);
          this.modal_visit = false;
          this.setNum = 3;
        }
        },1000);
    }else if(this.insetStatus == 1){
      this.modal_visit = true;
    }
  }else{
    this.lsInstall();
  }
  }
  visitOk(){
    if(this.insetStatus == 1){
      this.lsInstall();
    }
    this.modal_visit = false;
  }
  lsInstall(){
    //this.showstudentsForm = false;
    let paramJson: any = JSON.stringify({
      syllabusName: this.studentdata.name,
      currentDate: this.studentdata.currentDate,
      startTime: this.studentdata.startTime,
      endTime: this.studentdata.endTime,
      roomName: this.studentdata.roomName,
      employeeId: this.studentdata.employeeId,
      id: this.studentdata.id,
      status: this.buttonStatus ? 2 :0
    });
    
    if (!this.studentInformation.name){
      this.message.create('error', '学员信息不可以为空！');
      return false;
    }
    this.isOkLoading = true;
    this.http.post('/yeqs/curriculum/insertMemberMsg', { 
      paramJson,
      memberId: this.studentInformation.memberId,
      memberName: this.studentInformation.name,
      parentName: this.studentInformation.parentName,
      mobilePhone: this.studentInformation.mobilePhone,
      remarks: this.studentInformation.remarks,
      status: this.buttonStatus ? 2 : this.insetStatus
    }, false).then(res => {
      this.isOkLoading = false;
      if (res.code == 1000) {
        this.message.create('success', '添加成功！');
        this.showstudentsForm = false;
        this.buttonStatus = false;
        this.memberList_b  = [];
        this.total_b = 0;
        this.pageIndex_b = 1;
        this.selectquery();
      } else {
        this.message.create('error', res.info);
      }
    }); 
  }

  selectMemberList(data){
    this.selectshowstudents(data.id);
  }
//预约时学员信息查询
  selectshowstudents(memberId){
    this.http.post('/yeqs/curriculum/memberIdMsg', { memberId }, false).then(res => {
      if(res.code==1000){
        if (res.result.length){
          res.result[0].havacard = res.result[0].havacard == 0 ? '体验' : '正式'; 
          this.studentInformation = res.result[0];
          this.selectCardNum(memberId);
        }else{
          this.studentInformation = {};
          this.message.create('error', '无会员信息');
        }
      }else{
        this.message.create('error', res.info); 
      }
    }); 
  }

  details(data){
    this.studentdata = data;
    this.showListdetail = true;
    
  }
  closeListdetail(){
    this.showListdetail = false; 
    this.memberUserDetail = { memberId:0 };   
    this.selectquery();
  }

  //延期弹框
  memberRecord(memberId, studentdata){
    this.showRecord = true;
    this.http.post('/yeqs/curriculum/memberRecord', { memberId: memberId }, false).then(res => {
      if (res.code == 1000) {
        this.memberdetail = res.result;
        this.memberdetail.courseName = studentdata.name;
        this.memberdetail.currentDate = studentdata.currentDate;
        this.memberdetail.startTime = studentdata.startTime;
        this.memberdetail.endTime = studentdata.endTime;
        if (this.memberdetail.havacard == 0){
          this.memberdetail.havacard = '体验';
        }else{
          this.memberdetail.havacard = '正式';
        }
      } else {
        this.message.create('error', res.info);
      }
    }); 
  }

  closeRecord(){
    this.showRecord = false;
  }
  isRecord(){
    let paramJson: any = JSON.stringify({
      syllabusName: this.memberdetail.courseName,
      currentDate: this.memberdetail.currentDate,
      startDate: this.startDate,
      endDate: this.endDate,
      startTime: this.memberdetail.startTime,
      endTime: this.memberdetail.endTime,
      memberId: this.memberdetail.memberId
    });
    this.http.post('/yeqs/curriculum/postponedMemberRecord', { paramJson }, false).then(res => {
      if (res.code == 1000) { 
        this.showmodelts = true;
        this.callcurrentDate = res.result.currentDate + ' ' + res.result.startTime + '-'+res.result.endTime;
        this.seletdataList();
        this.nowDate();
      }else{
        this.message.create('error', res.info);
      }
    }); 
  }
  closemodelts(){
    this.showmodelts = false;
    this.showRecord = false;
  }


  //调课
  Adjust(memberId, memberName,item, studentdata){
    this.showAdjust = true;
    this.radioValue = '';
    this.RecordList = [];
    this.datalabelList = [];
    
    this.memberdetailTks = studentdata;
    this.memberdetailTks.item = item;
    this.http.post('/yeqs/curriculum/selectMsg', { memberId: memberId }, false).then(res => {
      if (res.code == 1000) {
        this.memberdetailTk = res.result.list;
        console.log(this.memberdetailTk);
      } else {
        this.message.create('error', res.info);
      }
    });
  }

  closeAdjust(){
    this.showAdjust = false;   
    this.radioValue = '';

    this.RecordList = [];
    this.datalabelList = [];

    this.RecordList1 = [];
    this.RecordList2 = [];
    this.RecordList3 = [];
    this.RecordList4 = [];
    this.RecordList5 = [];
    this.RecordList6 = [];
    this.RecordList7 = []; 
  }
  isAdjust(){
      if (!this.datalabelList.length){
      this.message.create('error', '请选择课程');
      return false;
    }
    let paramJson: any = JSON.stringify({
      babyNumber: this.memberdetailTk.babyNumber,
      name: this.memberdetailTk.name,
      parentName: this.memberdetailTk.parentName,
      cardNumber: this.memberdetailTk.cardNumber,
      memberId: this.memberdetailTks.item.memberId,
      cardCode: this.memberdetailTk.cardCode,
      list: this.datalabelList,
      mobilePhone: this.memberdetailTk.mobilePhone
    });
    let paramJsonDelect:any = JSON.stringify({
      syllabusName: this.memberdetailTks.name,
      memberId: this.memberdetailTks.item.memberId,
      startTime: this.memberdetailTks.startTime,
      endTime: this.memberdetailTks.endTime,
      currentDate: this.memberdetailTks.currentDate
    });                
    this.http.post('/yeqs/curriculum/adjustDeleteRecord', { paramJson: paramJsonDelect }, false).then(res => {
      var id = res.result;
      if (res.code == 1000) {
        //调课
        this.http.post('/yeqs/curriculum/adjustmentRecord', { paramJson, reserveId: id }, false).then(res => {
                if (res.code == 1000) {
                  this.message.create('success', '调课成功！');
                      this.radioValue = '';
                      this.showAdjust = false;
                      this.RecordList = [];
                      this.datalabelList = [];
                      this.selectquery();
                      this.showListdetail = false;
                      this.memberUserDetail = { memberId:0 }; 
                      this.RecordList1 = [];
                      this.RecordList2 = [];               
                      this.RecordList3 = [];
                      this.RecordList4 = [];
                      this.RecordList5 = [];
                      this.RecordList6 = [];
                      this.RecordList7 = [];
                    } else {
                  this.message.create('error', res.info);
                }
              });     
      } else {
        this.message.create('error', res.info);
      }
    });     
  }
  //查询课程类别
  selectSyllabusAll(){
    this.http.post('/yeqs/scheduling/selectSyllabusAll', {  }, false).then(res => {
      if (res.code == 1000) {
        this.SyllabusAllList =  res.result.list;
      } else {
        this.message.create('error', res.info);
      }
    }); 
  }
  
//办卡选课中课表展示
  selectlabel(){
    this.http.post('/yeqs/curriculum/selectIdRecord', { syllabusName: this.radioValue, startDate: this.tkstartDate, endDate: this.tkendDate }, false).then(res => {
      if (res.code == 1000) {
        this.datalabelList = [];
        this.RecordList = res.result.list;
        this.RecordList1 = [];
        this.RecordList2 = [];
        this.RecordList3 = [];
        this.RecordList4 = [];
        this.RecordList5 = [];
        this.RecordList6 = [];
        this.RecordList7 = [];
        this.RecordList.map( item=>{
          if(item.week=='星期一'){
            this.RecordList1.push(item);
          } else if (item.week == '星期二'){
            this.RecordList2.push(item);
          } else if (item.week == '星期三') {
            this.RecordList3.push(item);
          } else if (item.week == '星期四') {
            this.RecordList4.push(item);
          } else if (item.week == '星期五') {
            this.RecordList5.push(item);
          } else if (item.week == '星期六') {
            this.RecordList6.push(item);
          } else if (item.week == '星期日') {
            this.RecordList7.push(item);
          }
        })
      } else {
        this.message.create('error', res.info);
      }
    })
  }
  //点击会员停卡
  memberStopcard(memberId){
    this.stopcardMemberdetail = {};
    this.showStopcard = true;
    this.http.post('/yeqs/curriculum/selectMsg', { memberId: memberId }, false).then(res => {
      if (res.code == 1000) {
        this.stopcardMemberdetail = res.result.list;
      } else {
        this.message.create('error', res.info);
      }
    });
  }
//关闭停卡
  closeStopcard(){
    this.showStopcard = false;
  }
//确认停卡
  isStopcard(){
    if (!this.stopcardMemberdetail.reopenDate){
      this.message.create('error','日期不能为空');
      return false;
    }
    let paramJson: any = JSON.stringify({
      reopenDate: this.format.transform(this.stopcardMemberdetail.reopenDate, 'yyyy-MM-dd'),
      id: this.stopcardMemberdetail.id,
      name: this.stopcardMemberdetail.name
    });
    this.http.post('/yeqs/memberCard/pauseCard', { paramJson }, false).then(res => {
      if (res.code == 1000) {
        this.message.create('success', '操作成功！');
        this.showStopcard = false;
        this.showListdetail = false;
        this.memberUserDetail = { memberId:0 }; 
        this.selectquery();
      } else {
        this.message.create('error', res.info);
      }
    });
  }
  //选择课程
  datalabelChange(){
      
    this.datalabelList = [];
    this.RecordList1.map(item=>{
      if (item.id == this.courseNames){
        this.datalabelList.push(item);
      }
    })
    this.RecordList2.map(item => {
      if (item.id == this.courseNames) {
        this.datalabelList.push(item);
      }
    })
    this.RecordList3.map(item => {
      if (item.id == this.courseNames) {
        this.datalabelList.push(item);
      }
    })
    this.RecordList4.map(item => {
      if (item.id == this.courseNames) {
        this.datalabelList.push(item);
      }
    })
    this.RecordList5.map(item => {
      if (item.id == this.courseNames) {
        this.datalabelList.push(item);
      }
    })
    this.RecordList6.map(item => {
      if (item.id == this.courseNames) {
        this.datalabelList.push(item);
      }
    })
    this.RecordList7.map(item => {
      if (item.id == this.courseNames) {
        this.datalabelList.push(item);
      }
    })                        
  }
  settlement(item){
    let appointmentInfo = {
      id:'',
      memberId:'',
      name:'',
      nick:'',
      sex:'',
      monthAge:'',
      cardCode:'',
      cardId:'',
      reserveStatus:''
    };
       appointmentInfo.id = item.reserveId;
       appointmentInfo.sex = item.sex;
       appointmentInfo.monthAge = item.monthAge;
       appointmentInfo.cardId = item.id?item.id:'';
       appointmentInfo.reserveStatus = item.reserveStatus;
       appointmentInfo.memberId = item.memberId;
       appointmentInfo.name = item.memberName;
       this.consumption(appointmentInfo);  
  
  }
  /* ------------------- 结算预约 ------------------- */
  
  consumption(appointmentInfo) {
    const drawerRef = this.drawer.create({
      nzTitle: '添加消费',
      nzContent: ConsumptionsComponents,
      nzWidth: 720,
      nzBodyStyle: {
        'padding-bottom': '53px'
      },
      nzContentParams: {
        appointmentInfo
      }
    });

    // drawerRef.afterClose.subscribe(res => res && this.listPage.eaTable._request());
    drawerRef.afterClose.subscribe(res =>{
      this.showListdetail = false;
      this.memberUserDetail = { memberId:0 };
      this.nowDate();
      this.showListdetail = false;
    });
  }

  /*---------------取消预约-----------------------*/
  removeRecord(memberId,id){
    this.removeRecordData= {
      memberId,
      id
    }
    this.passwindow = true;
  }
  noPasswindow(){
    this.passwindow = false;
  }
  isPasswindow(){
    this.http.post('/yeqs/curriculum/deleteSingle', { memberId: this.removeRecordData.memberId, reserveId: this.removeRecordData.id }, false).then(res => {
        if(res.code == 1000){
          this.message.create('success', '取消成功！');
          this.passwindow = false;
          this.nowDate();
          this.showListdetail = false;
          this.memberUserDetail = { memberId:0 };
        }else{
          this.message.create('error', res.info);
        }
    });
  }
  modelChange(){
    this.searchSubject.next(this.mobilePhone);
  }
  upclass(){
    let Json =  JSON.stringify({
        name: this.studentdata.name,
        roomName: this.studentdata.roomName,
        employeeName: this.studentdata.employeeName,
        week: this.studentdata.week,
        startTime: this.studentdata.startTime,
        endTime: this.studentdata.endTime,
        employeeId: this.studentdata.employeeId
    });
    window.localStorage.setItem('jsons',Json);
    // this.router.navigateByUrl(`/home/customer/upclass`);
    this.drawer.create({
      nzTitle: '升班',
      nzWidth: 960,
      nzContent: UpclassComponent
    })
  }

}
