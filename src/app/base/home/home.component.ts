import { HttpService } from 'src/app/ng-relax/services/http.service';
import { AppState } from './../../core/reducers/reducers-config';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('BreadcrumbTmpt') BreadcrumbTmpt: TemplateRef<any>;

  constructor(
    private store: Store<AppState>,
    private http: HttpService
  ) { }

  clueNum: number = 0;
  nocardNum: number = 0;
  memberNum: number = 0;

  ngOnInit() {
    this.store.dispatch({ type: 'setBreadcrumb', payload: this.BreadcrumbTmpt });

    // this.http.post('/customer/noCardReturnVisitList', 
    //   { paramJson: JSON.stringify({ "traceType": 0, "followStageId": 2 }), pageNum: 1, pageSize: 1 }, false)
    //   .then(res => res.code == 1000 && (this.clueNum = res.result.totalPage));

    // this.http.post('/customer/noCardReturnVisitList',
    //   { paramJson: JSON.stringify({ "traceType": 5, "followStageId": 3 }), pageNum: 1, pageSize: 1 }, false)
    //   .then(res => res.code == 1000 && (this.nocardNum = res.result.totalPage));

    // this.http.post('/customer/memberReturnVisitList',
    //   { paramJson: JSON.stringify({ "traceType": 6, "followStageId": 4 }), pageNum: 1, pageSize: 1 }, false)
    //   .then(res => res.code == 1000 && (this.memberNum = res.result.totalPage));
  }

}
