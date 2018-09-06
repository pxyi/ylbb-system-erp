import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welfare',
  templateUrl: './welfare.component.html',
  styleUrls: ['./welfare.component.scss']
})
export class WelfareComponent implements OnInit {

  queryNode = [
    {
      label       : '订单号',
      key         : 'orderNumber',
      type        : 'input'
    },
    {
      label       : '会员姓名',
      key         : 'memberName',
      type        : 'input'
    },
    {
      label       : '商品名称',
      key         : 'productName',
      type        : 'input'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
