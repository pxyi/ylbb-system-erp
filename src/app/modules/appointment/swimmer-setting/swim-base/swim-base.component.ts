import { NzModalService } from 'ng-zorro-antd';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-swim-base',
  templateUrl: './swim-base.component.html',
  styleUrls: ['./swim-base.component.scss']
})
export class SwimBaseComponent implements OnInit {

  baseLoading: boolean;
  baseList: any[] = [];
  scheduleStatus;

  constructor(
    private http: HttpService,
    private modal: NzModalService
  ) { 
    this.getData();
  }

  getData() {
    this.baseLoading = true;
    this.http.post('/teacherCommonHour/list', {}, false).then(res => {
      this.scheduleStatus = res.result.teacherScheduleStatus;
      this.baseList = res.result.list;
      this.baseLoading = false;
    });
  }

  ngOnInit() {
  }

  save() {
    this.http.post('/teacherCommonHour/saveHour', { paramJson: JSON.stringify(this.baseList) });
  }

  init() {
    this.modal.confirm({
      nzTitle: '<i>初始化预约日班表?</i>',
      nzContent: '<b>初始化动作将清除当前的老师按日班表数据，根据基础排班重新设定日班表。确定初始化？</b>',
      nzMaskClosable: true,
      nzOnOk: () => { this.http.post('/teacherCommonHour/init') }
    });
  }

  @ViewChild('tplContent') tplContent;
  getHourLoading: boolean;
  teacherHourList: any[] = [];
  change(data, weekDay) {
    if (this.scheduleStatus == 0) {
      let _this_ = this;
      const modal = this.modal.create({
        nzTitle: '时刻信息',
        nzContent: this.tplContent,
        nzMaskClosable: false,
        nzClosable: false,
        nzFooter: [
          {
            label: '取消',
            onClick: () => modal.close()
          },
          {
            label: '确定',
            type: 'primary',
            loading: false,
            onClick() {
              this.loading = true;
              let teacherCommonHours = [];
              _this_.teacherHourList.map(res => res.checked && teacherCommonHours.push(res.value));
              _this_.http.post('/teacherCommonHour/saveHour', {
                paramJson: JSON.stringify({
                  teacherId: data.value.teacherId,
                  weekDay,
                  teacherCommonHours
                })
              }).then(res => {
                modal.close();
                _this_.getData();
              }).catch(err => this.loading = false);
            }
          }
        ]
      });
      this.getHourLoading = true;
      this.http.post('/teacherCommonHour/editTeacherHour', { paramJson: JSON.stringify({
        teacherId: data.value.teacherId,
        weekDay
      }) }, false).then(res => {
        this.getHourLoading = false;
        let teacherHourList = [];
        res.result.dates.map(item => {
          teacherHourList.push({
            label: item,
            value: item,
            checked: res.result.teacherReserveHours.indexOf(item) > -1
          })
        });
        this.teacherHourList = teacherHourList;
        this.teacherHourChecked();
      })
    }
  }

  allChecked: boolean;
  indeterminate: boolean;
  teacherHourChecked() {
    if (this.teacherHourList.every(item => item.checked === false)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (this.teacherHourList.every(item => item.checked === true)) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
  }
  updateAllChecked(): void {
    this.indeterminate = false;
    if (this.allChecked) {
      this.teacherHourList.forEach(item => item.checked = true);
    } else {
      this.teacherHourList.forEach(item => item.checked = false);
    }
  }

}
