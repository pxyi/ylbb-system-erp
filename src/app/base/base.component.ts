import { Component } from '@angular/core';

@Component({
  selector: 'ea-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent {

  public isCollapsed: boolean = false;

  themeColor: boolean | number;

}
