import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-member-card-detail',
  templateUrl: './member-card-detail.component.html',
  styleUrls: ['./member-card-detail.component.scss']
})
export class MemberCardDetailComponent implements OnInit {

  @Input() memberInfo: any = {};

  constructor(
  ) {  }

  ngOnInit() {
  }

}
