import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-timetableperiod',
  templateUrl: './timetableperiod.component.html',
  styleUrls: ['./timetableperiod.component.less']
})
export class TimetableperiodComponent implements OnInit {

  constructor(
    private http: HttpService,
    private message: NzMessageService,
    private format: DatePipe,
  ) {
    this.selectListData();
  }
  starttime: any;
  endtime: any;
  addtime: any = false;
  allChecked = false;
  indeterminate = false;
  displayData = [];
  removeTime = false;
  ListArray = '';
  data: any = [
    {
      id: ""
    }
  ];
  buttonLoading:boolean= false;


  refreshStatus(id): void {
    this.ListArray = id;
    this.showremoveModal();
  }

  selectListData() {
    this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/intelligent/selectScour', {}, false).then(res => {
      if (res.code == 1000) {
        this.data = res.result.list;
        console.log(this.data);
      } else {
        this.message.create('error', res.info);
      }
    });
  }
  //新增按钮
  addcoursefun() {
    this.addtime = true;
    this.starttime = null;
    this.endtime = null;
  }
  //关闭新增时段
  closeaddtime() {
    this.addtime = false;
  }
  //确认新增时段
  isaddtime() {
    let startHour = this.format.transform(this.starttime, 'HH');
    let startMinute = this.format.transform(this.starttime, 'mm');
    let endHour = this.format.transform(this.endtime, 'HH');
    let endMinute = this.format.transform(this.endtime, 'mm');
    let paramJson: any = JSON.stringify({
      startHour: startHour,
      startMinute: startMinute,
      endHour: endHour,
      endMinute: endMinute,
    });
    this.buttonLoading = true;
    this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/intelligent/insertScour', { paramJson }, false).then(res => {
      this.buttonLoading = false;

      if (res.code == 1000) {
        this.selectListData();
        this.message.create('success', '添加成功！');
        this.addtime = false;
      } else {
        this.message.create('error', res.info);
      }
    });
  }
  showremoveModal() {

    this.removeTime = true;


  }
  isremoveTime() {
    let id = this.ListArray;
    this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/intelligent/deleteScour', { id: id }, false).then(res => {
      if (res.code == 1000) {
        this.selectListData();
        this.message.create('success', '删除成功！');
        this.ListArray = '';
        this.removeTime = false;
      } else {
        this.message.create('error', res.info);
      }
    });
  }
  closeremoveTime() {
    this.removeTime = false;
  }

  ngOnInit() {
  }

}
