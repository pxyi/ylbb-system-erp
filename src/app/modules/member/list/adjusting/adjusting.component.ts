import { Component, OnInit, Input } from '@angular/core';
import { NzMessageService, NzDrawerRef } from 'ng-zorro-antd';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';


@Component({
  selector: 'app-adjusting',
  templateUrl: './adjusting.component.html',
  styleUrls: ['./adjusting.component.scss']
})
export class AdjustingComponent implements OnInit {
  today = new Date();
  @Input() id: number;
  current: number = 0;
  followRecordGroup: FormGroup;
  conditionList: any[] = [];
  dateRange: any = [];
  scourList: any[];
  memberDetail: any;
  isLoadingOne: boolean;
  memberData: any = {};
  memberdetailTk: any = {};
  radioName: string;
  SyllabusAllList: any[] = [];
  RecordList: any[] = [];
  dateList: any[];
  RecordList1: any[];
  RecordList2: any[];
  RecordList3: any[];
  RecordList4: any[];
  RecordList5: any[];
  RecordList6: any[];
  RecordList7: any[];
  datalabelList: any[];
  startDate: any = '';
  Tuesday: any = '';
  Wednesday: any = '';
  Thursday: any = '';
  Friday: any = '';
  Saturday: any = '';
  endDate: any = '';
  dateIndex: number;
  isBtnDisVled: boolean = true;
  nowstartDate: any;
  nowendDate: any;
  listArr: any[] = [];
  selectData: any;
  kcName: any[] = [];
  reserveList: any[] = [];
  delectData: any[] = [];
  copywriting: string;
  employeeList: any[] = [];
  constructor(
    private message: NzMessageService,
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private format: DatePipe,
    private drawerRef: NzDrawerRef
  ) {
  }
  ngOnInit() {
    this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/scheduling/selectCondition', {}, false).then(res => { this.conditionList = res.result.list });
    this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/memberCard/getMemberCards', { memberId: this.id }, false).then(res => { this.followRecordGroup.patchValue({ memberName: res.result[0].memberName }); });
    this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/curriculum/selectMsg', { memberId: this.id }, false).then(res => { this.memberdetailTk = res.result.list; });
    this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/scheduling/selectSyllabusAll', {}, false).then(res => { this.SyllabusAllList = res.result.list; });
    this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/intelligent/selectScour', {}, false).then(res => { this.dateList = res.result.list; });
    this.nowDate();
    this.followRecordGroup = this.fb.group({
      memberName: [, [Validators.required]],
      syllabusName: [, [Validators.required]],
      startDate: [, [Validators.required]],
      endDate: [, [Validators.required]],
      week: [, [Validators.required]],
      scourId: [, [Validators.required]],
      employeeId: [, [Validators.required]],
      date: [, [Validators.required]],
      memberId: [Number(this.id)],
      flag: [false]
    });
  }
  disabledDate = (current: Date): boolean => {
    return current && current.getTime() < Date.now();
  };
  dateChange(e) {
    let [startDate, endDate] = [this.format.transform(this.dateRange[0], 'yyyy-MM-dd'), this.format.transform(this.dateRange[1], 'yyyy-MM-dd')];
    this.followRecordGroup.patchValue({ startDate });
    this.followRecordGroup.patchValue({ endDate });
  }
  firstNext() {
    if (this.followRecordGroup.invalid) {
      for (let i in this.followRecordGroup.controls) {
        this.followRecordGroup.controls[i].markAsDirty();
        this.followRecordGroup.controls[i].updateValueAndValidity();
      }
    } else {
      this.isLoadingOne = true;
      this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/curriculum/readyClass', { paramJson: JSON.stringify(this.followRecordGroup.value) }, false).then(ress => {
        this.isLoadingOne = false;
        if (ress.code == 1000) {
          this.delectData = ress.result;
          this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/curriculum/selectMsg', { memberId: this.id }, false).then(res => {
            res.result.list.cardNumber += ress.result.length;
            this.memberdetailTk = res.result.list;
          });
          this.current = 1;
        } else {
          this.message.warning(ress.info);
        }
      });
    }
  }
  prve() {
    this.current = 0;
  }
  twoNext() {
    if (!this.listArr.length) {
      this.message.create('error', '请至少选择一个课程');
      return false;
    }
    let cardNum = 0;
    let list = [];
    let sbs = false;
    this.kcName.map(item => {
      if (!item.arranging || !(item.arranging > 0)) {
        sbs = true;
        return false;
      } else {
        cardNum += item.arranging;
        item.reserveList = [];
        list.push(item);
      }
    })
    if (sbs) {
      this.message.create('error', '请输入正确的排课次数');
      return false;
    }


    if (cardNum > this.memberdetailTk.cardNumber) {
      this.message.create('error', '剩余卡次不足');
      return false;
    }
    list.map(item => {
      this.listArr.map(data => {
        if (item.name == data.name) {
          item.reserveList.push(data);
        }
      })
    })
    let paramJson: any = JSON.stringify({
      babyNumber: this.memberdetailTk.babyNumber,
      name: this.memberdetailTk.name,
      parentName: this.memberdetailTk.parentName,
      cardCode: this.memberdetailTk.cardCode,
      mobilePhone: this.memberdetailTk.mobilePhone,
      memberId: this.memberdetailTk.memberId,
      list
    });
    //this.isLoadingOne = true;

    this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/curriculum/deleteReadyClass', { paramJson: JSON.stringify({ reserveRecords: this.delectData }) }, false).then(ress => {
      if (ress.code == 1000) {
        this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/curriculum/insertMemberRecord', { paramJson, flag: false }, false).then(res => {
          this.isLoadingOne = false;
          if (res.code == 1000) {
            this.current = 2;
            let rows = res.result.reserveList;
            rows.sort(function (a, b) {
              return Date.parse(a.currentDate) - Date.parse(b.currentDate);//时间正序
            });
            this.reserveList = rows;
            this.copywriting = res.result.copywriting;
          } else {
            this.message.warning(res.info);
          }
        });
      } else {
        this.message.warning(ress.info);
      }
    })


  }
  nowDate() {
    this.dateIndex = 0;
    this.datefun(0);
  };
  nextDate() {
    this.dateIndex++;
    this.datefun(this.dateIndex * 7);
  };
  prveDate() {
    if (this.dateIndex > 0) {
      this.dateIndex--;
      this.datefun(this.dateIndex * 7);
    }
  };
  datefun(index) {
    if (this.dateIndex == 0) {
      this.isBtnDisVled = true;
    } else {
      this.isBtnDisVled = false;
    }
    let now: any = new Date();
    let nowDayOfWeek = now.getDay();
    nowDayOfWeek = nowDayOfWeek == 0 ? 7 : nowDayOfWeek;
    this.startDate = this.showWeekFirstDay(1 - nowDayOfWeek + index);
    this.Tuesday = this.showWeekFirstDay(2 - nowDayOfWeek + index);;
    this.Wednesday = this.showWeekFirstDay(3 - nowDayOfWeek + index);;
    this.Thursday = this.showWeekFirstDay(4 - nowDayOfWeek + index);;
    this.Friday = this.showWeekFirstDay(5 - nowDayOfWeek + index);;
    this.Saturday = this.showWeekFirstDay(6 - nowDayOfWeek + index);;
    this.endDate = this.showWeekFirstDay(7 - nowDayOfWeek + index);
    if (!this.nowstartDate) {
      this.nowstartDate = this.startDate;
      this.nowendDate = this.endDate
    }
    this.RecordList = [];
    this.datalabelList = [];
    this.RecordList1 = [];
    this.RecordList2 = [];
    this.RecordList3 = [];
    this.RecordList4 = [];
    this.RecordList5 = [];
    this.RecordList6 = [];
    this.RecordList7 = [];
    this.kcName = [];
    this.listArr = [];

    this.SyllabusAllList.map(item => {
      item.checked = false;
      item.arranging = null;
    })
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



  //选择课程
  datalabelChange(data) {
    //data.syllabusName = data.name;
    if (data.checked) {
      this.datalabelList.push(data);
      this.listArr.push(data);
    } else {
      for (var i = 0; i < this.datalabelList.length;) {
        if (this.datalabelList[i].id == data.id) {
          this.datalabelList.splice(i, 1);
        } else {
          i++;  //只有在没有删除元素时才对索引 i++
        }
      }
      for (var i = 0; i < this.listArr.length;) {
        if (this.listArr[i].id == data.id) {
          this.listArr.splice(i, 1);
        } else {
          i++;  //只有在没有删除元素时才对索引 i++
        }
      }

    }
  }


  // 查询课程
  selectlabel(data) {
    if (data) {
      if (data.checked) {
        this.selectData = data;
        this.kcName.push(data);
        this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/curriculum/selectIdRecord', { syllabusName: data.name, startDate: this.startDate, endDate: this.endDate }, false).then(res => {
          if (res.code == 1000) {
            //let arr = this.RecordList.concat(res.result.list);
            this.RecordList = this.RecordList.concat(res.result.list);
            this.datalabelList = [];
            this.RecordList1 = [];
            this.RecordList2 = [];
            this.RecordList3 = [];
            this.RecordList4 = [];
            this.RecordList5 = [];
            this.RecordList6 = [];
            this.RecordList7 = [];
            this.RecordList.map(item => {
              if (item.week == '星期一') {
                this.RecordList1.push(item);
              } else if (item.week == '星期二') {
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
        });
      } else {
        this.selectData = {};
        for (var i = 0; i < this.listArr.length;) {
          if (this.listArr[i].name == data.name) {
            this.listArr.splice(i, 1);
          } else {
            i++;  //只有在没有删除元素时才对索引 i++
          }
        }
        for (var i = 0; i < this.kcName.length;) {
          if (this.kcName[i].name == data.name) {
            this.kcName.splice(i, 1);
          } else {
            i++;  //只有在没有删除元素时才对索引 i++
          }
        }

        let arr = JSON.parse(JSON.stringify(this.RecordList));
        for (var i = 0; i < arr.length;) {
          if (arr[i].name == data.name) {
            arr.splice(i, 1);
          } else {
            i++;  //只有在没有删除元素时才对索引 i++
          }
        }
        this.RecordList = arr;
        this.datalabelList = [];
        this.RecordList1 = [];
        this.RecordList2 = [];
        this.RecordList3 = [];
        this.RecordList4 = [];
        this.RecordList5 = [];
        this.RecordList6 = [];
        this.RecordList7 = [];
        this.RecordList.map(item => {
          if (item.week == '星期一') {
            this.RecordList1.push(item);
          } else if (item.week == '星期二') {
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

      }
    }
  }
  selectclass() {
    let syllabusName = this.followRecordGroup.value.syllabusName;
    this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/curriculum/reserveTimeInterval', { syllabusName }, false).then(res => {
      res.result.listTime.map(item => {
        item.label = item.startTime + '-' + item.endTime;
      })
      this.scourList = res.result.listTime;
      this.employeeList = res.result.listEmployee;
      this.followRecordGroup.patchValue({ scourId: null });
      this.followRecordGroup.patchValue({ employeeId: null });
    });
  }

  @DrawerClose() close: () =>  void;
}