import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.less']
})
export class UpdateComponent implements OnInit {

  @Input() isInit: boolean;

  current: number = 0;

  expectTotalIncome: number;

  constructor(
  ) {
  }

  ngOnInit() {
  }

}
