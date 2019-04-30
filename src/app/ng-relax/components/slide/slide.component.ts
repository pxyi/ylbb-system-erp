import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ea-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.less']
})
export class SlideComponent {


  @Input() width    : number = 960;

  @Input() closeLink: string; 

  constructor() { }

}
