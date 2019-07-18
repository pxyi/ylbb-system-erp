import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit } from '@angular/core';

declare const require: any;
const DataSet = require('@antv/data-set');

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.less']
})
export class SaleComponent implements OnInit {

  viserData: any;

  label = {
    formatter: function formatter(val) {
      return val + '元';
    }
  }


  constructor(
    private http: HttpService
  ) {
    this.http.post('/dataAnalysis/saleroomDataByMonth').then(res => {
      let sourceData = [];
      res.result.mapLines.map(m => sourceData.push({ day: m.createDate, '办卡金额': m.cardAmount, '商品金额': m.consumeAmount }));
      const dv = new DataSet.View().source(sourceData);
      dv.transform({
        type: 'fold',
        fields: ['办卡金额', '商品金额'],
        key: 'city',
        value: 'temperature',
      });
      this.viserData = dv.rows;
    })
  }

  ngOnInit() {
  }


}
