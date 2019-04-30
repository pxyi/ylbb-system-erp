import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-swimmer',
  templateUrl: './swimmer.component.html',
  styleUrls: ['./swimmer.component.less']
})
export class SwimmerComponent implements OnInit {

  tabIndex: number = 0;

  constructor() { }

  ngOnInit() {
  }

}
