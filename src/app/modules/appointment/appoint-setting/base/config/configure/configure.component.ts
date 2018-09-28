import { NzMessageService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
import { HttpService } from './../../../../../../ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.scss']
})
export class ConfigureComponent implements OnInit {

  @Input() id;

  loading: boolean;

  dataSet: any[] = [];

  constructor(
    private http: HttpService,
    private format: DatePipe,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.http.post('/reserveCommonConfig/configList', { paramJson: JSON.stringify({ planId: this.id }) }, false).then(res => {
      this.loading = false;
      res.result.map(r => r.time = new Date(`2000-01-01 ${r.key}`));
      res.code == 1000 && (this.dataSet = res.result);
    }).catch(err => this.loading = false);
  }

  delete(data) {
    this.http.post('/reserveCommonConfig/delConfigByTime', { paramJson: JSON.stringify({ 
      planId: this.id,
      hourPeriod: data.key.split(':')[0],
      minutePeriod: data.key.split(':')[1],
    }) }).then(res => this.getData());
  }

  add() {
    let weeks = { week1: 0, week2: 0, week3: 0, week4: 0, week5: 0, week6: 0, week7: 0 };
    this.dataSet.push({ edit: true, key: null, time: null, value: { baby: JSON.parse(JSON.stringify(weeks)), child: JSON.parse(JSON.stringify(weeks)) } });
  }

  update(data) {
    if (!data.key) { this.message.warning('请选择时间段'); return;}
    if (data.edit) {
      data.loading = true;
      let params = JSON.parse(JSON.stringify(data));
      params.planId = this.id;
      params.oldTimeValue = params.key;
      params.timeValue = params.key;
      params.weeks = {
        week1: {
          boby: params.value.baby.week1,
          child: params.value.child.week1
        },
        week2: {
          boby: params.value.baby.week2,
          child: params.value.child.week2
        },
        week3: {
          boby: params.value.baby.week3,
          child: params.value.child.week3
        },
        week4: {
          boby: params.value.baby.week4,
          child: params.value.child.week4
        },
        week5: {
          boby: params.value.baby.week5,
          child: params.value.child.week5
        },
        week6: {
          boby: params.value.baby.week6,
          child: params.value.child.week6
        },
        week7: {
          boby: params.value.baby.week7,
          child: params.value.child.week7
        },
      };
      this.http.post('/reserveCommonConfig/savePlanDetail', { paramJson: JSON.stringify(params) }).then(res => {
        this.getData();
      });
    } else {
      data.edit = true;
    }
  }

  reserveChange(e, data) {
    e && (data.key = this.format.transform(e, 'yyyy-MM-dd HH:mm').split(' ')[1]);
  }

  disabledHours(): number[] {
    return [0, 1, 2, 3, 4, 5, 6, 7, 22, 23];
  }

}
