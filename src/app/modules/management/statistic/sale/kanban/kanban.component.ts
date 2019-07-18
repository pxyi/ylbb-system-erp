import { HttpService } from './../../../../../ng-relax/services/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { startOfMonth, endOfMonth, format } from 'date-fns';
import { TableComponent } from 'src/app/ng-relax/components/table/table.component';

declare const require: any;
const DataSet = require('@antv/data-set');

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.less']
})
export class KanbanComponent implements OnInit {

  viserData: any;

  monthChecked = new Date();

  kanbanData: any = {};

  constructor(
    private http: HttpService
  ) { 
    this.http.post('/dataAnalysis/convertData').then(res => {
      const sourceData = [
        { action: '客户数', pv: res.result.customerCount },
        { action: '体验数', pv: res.result.experienceCount },
        { action: '办卡数', pv: res.result.cardCount }
      ];
      this.kanbanData = res.result;
      
      const dv = new DataSet.View().source(sourceData);
      dv.transform({
        type: 'percent',
        field: 'pv',
        dimension: 'action',
        as: 'percent'
      });
      this.viserData = dv.rows;
    })
  }

  ngOnInit() {
  }
  itemTpl = `<li data-index={index} style="margin-bottom:4px;">
              <span style="background-color:{color};" class="g2-tooltip-marker"></span> {name}<br/>
              <span style="padding-left: 16px">浏览人数：{pv}</span><br/>
              <span style="padding-left: 16px">占比：{percent}</span><br/>
            </li>`;


  @ViewChild('table') table: TableComponent;
  paramsInit = { startDate: format(startOfMonth(new Date()), 'YYYY-MM-DD'), endDate: format(endOfMonth(new Date()), 'YYYY-MM-DD') }
  monthChange(e) {
    this.table.request({ startDate: format(startOfMonth(e), 'YYYY-MM-DD'), endDate: format(endOfMonth(e), 'YYYY-MM-DD') });
  }

  funnelOpts = {
    position: 'action*percent',
    color: ['action', ['#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF']],
    label: ['action*pv', (action: any, pv: any) => {
      return action + ' ' + pv;
    }, {
        offset: 35,
        labelLine: {
          lineWidth: 1,
          stroke: 'rgba(0, 0, 0, 0.15)',
        }
      }],
    tooltip: ['action*pv*percent', (action: any, pv: any, percent: any) => ({
      name: action,
      percent: Math.floor(percent * 100) + '%',
      pv: pv,
    })]
  };


}
