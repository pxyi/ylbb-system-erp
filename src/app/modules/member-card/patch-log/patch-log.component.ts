import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patch-log',
  templateUrl: './patch-log.component.html',
  styleUrls: ['./patch-log.component.scss']
})
export class PatchLogComponent implements OnInit {

  queryNode = [
    {
      label       : '记录时间',
      key         : 'startDate',
      type        : 'datepicker'
    },
    {
      label       : '新卡号',
      key         : 'newCode',
      type        : 'input'
    },
    {
      label       : '原卡号',
      key         : 'oldCode',
      type        : 'input'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}