import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/reducers/reducers-config';

@Component({
  selector: 'app-appoint-setting',
  templateUrl: './appoint-setting.component.html',
  styleUrls: ['./appoint-setting.component.scss']
})
export class AppointSettingComponent implements OnInit {

  @ViewChild('breadcrumb') breadcrumb: TemplateRef<any>;

  tabIndex: number = 0;

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.store.dispatch({ type: 'setBreadcrumb', payload: this.breadcrumb });
  }

}
