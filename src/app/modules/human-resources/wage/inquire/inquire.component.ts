import { DatePipe } from '@angular/common';
import { AppState } from './../../../../core/reducers/reducers-config';
import { HttpService } from './../../../../ng-relax/services/http.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-inquire',
  templateUrl: './inquire.component.html',
  styleUrls: ['./inquire.component.scss']
})
export class InquireComponent implements OnInit {

  @ViewChild('breadcrumbTmpt') breadcrumbTmpt: TemplateRef<any>

  showPopover: boolean;
  generateLoading: boolean;

  generateMonth;

  constructor(
    private http: HttpService,
    private store: Store<AppState>,
    private format: DatePipe
  ) { }

  ngOnInit() {
    this.store.dispatch({ type: 'setBreadcrumb', payload: this.breadcrumbTmpt });
  }

  generate() {
    this.generateLoading = true;
    this.http.post('/payroll/generatePayroll', { 
      month: this.format.transform(this.generateMonth, 'yyyy-MM') 
    }).then(res => this.generateLoading = false).catch(err => this.generateLoading = false);
  }

}
