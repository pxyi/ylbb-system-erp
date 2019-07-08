import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';
import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzDrawerRef } from 'ng-zorro-antd';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { differenceInCalendarDays } from 'date-fns';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-upclass',
  templateUrl: './upclass.component.html',
  styleUrls: ['./upclass.component.scss']
})
export class UpclassComponent implements OnInit {
  today = new Date();
  details: any = {};
  current: number = 0;
  followRecordGroup: FormGroup;
  conditionList: any[] = [];
  dateRange: any = [];
  scourList: any[];
  memberDetail: any;
  isLoadingOne: boolean;
  memberData: any = {};
  memberdetailTk: any = {};
  startDate: string ;
  endDate: string ;
  classList:any[];
  constructor(
    private message: NzMessageService,
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private format: DatePipe,
    private drawerRef: NzDrawerRef
  ) { 
    this.followRecordGroup = this.fb.group({
      roomName: [],
      employeeName:[],
      name:[],
      startDate: [],
      endDate: [],
      week: [],
      scourId: [],
      date: [],
      flag: [false]
    });
    this.details = JSON.parse( window.localStorage.getItem('jsons'));
    this.http.post('/yeqs/scheduling/selectCondition', {}, false).then(res => { this.classList = res.result.list; });
    this.http.post('/yeqs/intelligent/selectScour', {}, false).then(res => {
      res.result.list.map(item => {
        item.label = item.startTime + '-' + item.endTime;
        if(this.details.startTime == item.startTime&&this.details.endTime == item.endTime){
          this.details.scourId = item.id;
        }
      })
      
      this.scourList = res.result.list
    });
  }

  ngOnInit() {

  }
  dateChange(e) {
    let [startDate, endDate] = [this.format.transform(this.dateRange[0], 'yyyy-MM-dd'), this.format.transform(this.dateRange[1], 'yyyy-MM-dd')];
    this.startDate = startDate;
    this.endDate = endDate;
  }
  firstNext(){
    if(!this.details.week){
      this.message.warning('请选择星期');
      return ;
    }
    if(!this.details.scourId){
      this.message.warning('请选择时间段');
      return ;
    }
    if(!this.startDate){
      this.message.warning('请选择日期');
      return ;
    }       
    this.current = 1;
  }
  twoNext(){
    if(!this.details.newName){
      this.message.warning('请选择课程');
      return ;
    }
    let paramJson: any = this.details;
    paramJson.startDate = this.startDate;
    paramJson.endDate = this.endDate;
    this.http.post('/yeqs/curriculum/promotionClass', { paramJson: JSON.stringify(paramJson) }, false).then(res => {
      if (res.code == 1000) {
        this.current = 2;
    } else {
      this.message.warning(res.info);
    }
    });
  }
  prve(){
    this.current = 0;
  }
  disabledDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, this.today) < 0;
  };

  @DrawerClose() close: () => void;
}
