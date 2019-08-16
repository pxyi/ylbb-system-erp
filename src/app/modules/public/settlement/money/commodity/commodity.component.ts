import { NzDrawerRef } from 'ng-zorro-antd';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-commodity',
  templateUrl: './commodity.component.html',
  styleUrls: ['./commodity.component.less']
})
export class CommodityComponent implements OnInit {

  @Input() commodityList: any[] = [];

  constructor(
    private drawerRef: NzDrawerRef
  ) { }

  ngOnInit() {
  }

  add(data) {
    this.drawerRef.close(data);
  }

}
