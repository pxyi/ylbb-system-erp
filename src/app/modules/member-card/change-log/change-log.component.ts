import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-log',
  templateUrl: './change-log.component.html',
  styleUrls: ['./change-log.component.scss']
})
export class ChangeLogComponent implements OnInit {

  queryNode = [
    {
      label       : '记录时间',
      key         : 'startDate',
      type        : 'datepicker'
    },
    {
      label       : '变更类型',
      key         : 'comment',
      type        : 'select',
      options     : [ { name: '续卡', id: '续卡'},
                      { name: '调整', id: '调整'},
                      { name: '建卡', id: '建卡'},
                      { name: '停卡', id: '停卡'},
                      { name: '重开卡', id: '重开卡'} ]
    },
    {
      label       : '卡号',
      key         : 'cardCode',
      type        : 'input'
    }
  ];

  constructor() { }

  ngOnInit() {
  }


}
