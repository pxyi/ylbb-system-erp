import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit } from '@angular/core';

declare const require: any;
const DataSet = require('@antv/data-set');

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.less']
})
export class TodayComponent implements OnInit{


  viserData: any;

  visitDataNumber: any = {};
  flexDataNumber: any = {};

  constructor(
    private http: HttpService
  ) {
    this.http.post('/dataAnalysis/serviceGeneralSituation').then(res => {
      let sourceData = [];
      for (let i = res.result.startHour; i <= 23; i++) {
        sourceData.push({
          hour: `${i}`,
          '今日': res.result.todayData[`${i}`] >= 0 ? res.result.todayData[`${i}`] : null,
          '昨日': res.result.yesterdayDatas[`${i}`]
        })
      }
      const dv = new DataSet.View().source(sourceData);
      dv.transform({
        type: 'fold',
        fields: ['今日', '昨日'],
        key: 'city',
        value: 'temperature',
      });
      this.viserData = dv.rows;
    });

    this.http.post('/dataAnalysis/memberGeneralSituation').then(res => this.visitDataNumber = res.result);

    this.http.post('/dataAnalysis/saleroomDataByDay').then(res => this.flexDataNumber = res.result);
  }

  ngOnInit() {
  }

}
