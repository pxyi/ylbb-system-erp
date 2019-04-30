import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less']
})
export class DetailComponent implements OnInit {

  @Input() memberInfo: any = {};

  constructor(
  ) { }

  ngOnInit() {
    this.memberInfo.totalTimes = `${this.memberInfo.times + this.memberInfo.freeTimes}（${this.memberInfo.times}/${this.memberInfo.freeTimes}）`;
    this.memberInfo.remainTimes = `${this.memberInfo.remaintimes + this.memberInfo.remainFreeTimes}（${this.memberInfo.remaintimes}/${this.memberInfo.remainFreeTimes}）`
    this.memberInfo.totalAmount = `${this.memberInfo.amount + this.memberInfo.freeAmount}（${this.memberInfo.amount}/${this.memberInfo.freeAmount}）`;
    this.memberInfo.remainAmount = `${this.memberInfo.remainAmount + this.memberInfo.remainFreeAmount}（${this.memberInfo.remainAmount}/${this.memberInfo.remainFreeAmount}）`
  }

}
