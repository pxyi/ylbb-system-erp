import { AppState } from '../../../core/reducers/reducers-config';
import { Component, Input, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ea-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  @Input() breadcrumb: object[] = [];

  breadcrumbTmpt: TemplateRef<any>;

  constructor(
    private store: Store<AppState>
  ) { 
    this.store.select('breadcrumbState').subscribe(res => this.breadcrumbTmpt = res);
  }

}
