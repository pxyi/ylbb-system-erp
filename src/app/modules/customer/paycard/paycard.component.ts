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

  loading: boolean;

  constructor(
    private http: HttpService,
    private store: Store<AppState>
  ) { 
  }

  ngOnInit() {
    this.store.dispatch({ type: 'setBreadcrumb', payload: this.breadcrumbTmpt });
  }

  searchSubmit() {
    this.loading = true;
    this.http.post('/payofcard/getpayofcardlist', { 
      paramJson: JSON.stringify({ cardNo: this.memberCard }) 
    }, false).then(res => {
      this.loading = false;
      this.dataSet = res.code == 1000 ? res.result : [];
    }, err => this.loading = false);
  }

  consumption(id) {
    
  }

}
