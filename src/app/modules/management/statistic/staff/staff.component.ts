import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/ng-relax/services/http.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.less']
})
export class StaffComponent implements OnInit {

  showInfo: boolean;

  managementInfo: any = {};

  constructor(
    private http: HttpService
  ) {
    this.getData();
    
  }

  getData() {
    this.http.post('/income/queryShopBusiness').then(res => {
      res.code == 1000 && (this.managementInfo = res.result);
      this.showInfo = res.code == 1000;
    })
  }
  ngOnInit() {
    this.getPmData({ orderBy: 1 });
  }

  dataSet: any[] = [];
  
  getPmData(params) {
    this.http.post('/dataAnalysis/serviceRanking', params).then(res => this.dataSet = res.result.serviceRank);
  }
}
