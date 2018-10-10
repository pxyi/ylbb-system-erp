import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AppState } from 'src/app/core/reducers/reducers-config';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-swimmer-setting',
  templateUrl: './swimmer-setting.component.html',
  styleUrls: ['./swimmer-setting.component.scss']
})
export class SwimmerSettingComponent implements OnInit {

  @ViewChild('breadcrumb') breadcrumb: TemplateRef<any>;

  tabIndex: number = 0;

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.store.dispatch({ type: 'setBreadcrumb', payload: this.breadcrumb });
  }

}
