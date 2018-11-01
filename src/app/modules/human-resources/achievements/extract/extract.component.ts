import { DatePipe } from '@angular/common';
import { AppState } from './../../../../core/reducers/reducers-config';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { DeleteData } from 'src/app/ng-relax/decorators/delete.decorator';

@Component({
  selector: 'app-extract',
  templateUrl: './extract.component.html',
  styleUrls: ['./extract.component.scss']
})
export class ExtractComponent implements OnInit {

  @ViewChild('breadcrumbTmpt') breadcrumbTmpt: TemplateRef<any>;

  constructor(
    private http: HttpService,
    private store: Store<AppState>,
    private format: DatePipe
  ) { }

  ngOnInit() {
    this.store.dispatch({ type: 'setBreadcrumb', payload: this.breadcrumbTmpt });
  }

  @DeleteData('/bonusDetail/removeBonusDetail') delete: (id) => void;

  showPopover: boolean;
  resetTime: any[];
  resetLoading: boolean;

  resetExtract() {
    this.resetLoading = true;
    let [startDate, endDate] = [this.format.transform(this.resetTime[0], 'yyyy-MM-dd'), this.format.transform(this.resetTime[1], 'yyyy-MM-dd') ];
    this.http.post('/bonusDetail/refreshBonusDetail', { startDate, endDate }).then(res => this.resetLoading = false).catch(err => this.resetLoading = false);
  }

}
