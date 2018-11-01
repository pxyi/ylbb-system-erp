import { QueryNode } from 'src/app/ng-relax/components/query/query.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  nowDate: Date = new Date();

  queryNode: QueryNode[] = [
    { label: '统计方式', key: 'statictype', type: 'select', options: [{ name: '总计', id: 0 }, { name: '按日', id: 1 }], default: 0 },
    { label: '员工', key: 'employeeId', type: 'select', optionsUrl: '/member/getStoreTeachers' },
    { label: '起始日期', key: 'date', valueKey: ['startDate', 'endDate'], type: 'rangepicker', default: [this.nowDate, this.nowDate] }
  ]

  constructor() { }

  ngOnInit() {
  }

  log(e) {console.log(e)}

}