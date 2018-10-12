import { NzModalService } from 'ng-zorro-antd';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-swim-byday',
  templateUrl: './swim-byday.component.html',
  styleUrls: ['./swim-byday.component.scss']
})
export class SwimBydayComponent implements OnInit {

  dayLoading = true;
  dayList: any[] = [];
  scheduleStatus;

  constructor(
    private http: HttpService,
    private modal: NzModalService
  ) {
    this.getData();
  }

  getData() {
    this.dayLoading = true;
    this.http.post('/teacherDayConfig/list', {}, false).then(res => {
      this.scheduleStatus = res.result.teacherScheduleStatus;
      this.dayList = res.result;
      this.dayLoading = false;
    });
  }

  ngOnInit() {
  }
  
  save() {
    this.http.post('/teacherDayConfig/save', { paramJson: JSON.stringify(this.dayList['list']) });
  }


  @ViewChild('tplContent') tplContent;
  getHourLoading: boolean;
  teacherHourList: any[] = [];
  change(data, dutyDay) {
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
              let teacherDayHours = [];
              _this_.teacherHourList.map(res => res.checked && teacherDayHours.push(res.value));
              _this_.http.post('/teacherDayConfig/saveHour', {
                paramJson: JSON.stringify({
                  teacherId: data.value.teacherId,
                  dutyDay,
                  teacherDayHours
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
      this.http.post('/teacherDayConfig/editTeacherHour', {
        paramJson: JSON.stringify({
          teacherId: data.value.teacherId,
          dutyDay
        })
      }, false).then(res => {
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
