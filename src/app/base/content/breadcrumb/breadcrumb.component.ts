import { Component, Input } from '@angular/core';

@Component({
  selector: 'ea-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  @Input() breadcrumb: object[] = [];

}
