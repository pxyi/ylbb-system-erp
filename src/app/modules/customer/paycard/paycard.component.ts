import { AppState } from './../../../core/reducers/reducers-config';
import { HttpService } from './../../../ng-relax/services/http.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-paycard',
  templateUrl: './paycard.component.html',
  styleUrls: ['./paycard.component.scss']
})
export class PaycardComponent implements OnInit {

  @ViewChild('breadcrumbTmpt') breadcrumbTmpt: TemplateRef<any>;

  memberCard: number;

  dataSet: any[] = [];

  constructor(
    private http: HttpService,
    private store: Store<AppState>
  ) { 
  }

  ngOnInit() {
    this.store.dispatch({ type: 'setBreadcrumb', payload: this.breadcrumbTmpt });
  }

  searchSubmit() {

  }

}
