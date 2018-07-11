import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  @Input() previewInfo: object;

  constructor() { }

  ngOnInit() {
    console.log(this.previewInfo)
  }

}
