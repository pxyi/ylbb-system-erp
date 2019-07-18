import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit } from '@angular/core';

declare const require: any;
const DataSet = require('@antv/data-set');

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.less']
})
export class SourceComponent implements OnInit {

  sourceNumberData: any;

  sourceRateData: any;

  constructor(
    private http: HttpService
  ) { 
    this.http.post('/dataAnalysis/clueFrom').then(res => {
      let sourceNumber = [],
          sourceRate = [];
      res.result.clueSources.map(o => {
        sourceNumber.push({ item: o.sourceName, count: o.count });
        sourceRate.push({ item: o.sourceName, count: (o.convertorRate || 0) * 100 });
      });

      const sourceNumberDv = new DataSet.View().source(sourceNumber);
      sourceNumberDv.transform({ type: 'percent', field: 'count', dimension: 'item', as: 'percent' });
      this.sourceNumberData = sourceNumberDv.rows;

      const sourceRateDv = new DataSet.View().source(sourceRate);
      sourceRateDv.transform({ type: 'percent', field: 'count', dimension: 'item', as: 'percent' });
      this.sourceRateData = sourceRateDv.rows;
    })
  }

  ngOnInit() {
    
  }
  
  sourceNumberlabelConfig = ['percent', {
    formatter: (val, item) => {
      return item.point.item + ': ' + item.point.count;
    },
  }];
  sourceRatelabelConfig = ['percent', {
    formatter: (val, item) => {
      return item.point.item + ': ' + (item.point.count / 100) + '%';
    },
  }];


}
