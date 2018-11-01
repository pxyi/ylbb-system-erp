import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commission',
  templateUrl: './commission.component.html',
  styleUrls: ['./commission.component.scss']
})
export class CommissionComponent implements OnInit {

  bonusRateList: any[] = [];

  constructor(
    private http: HttpService
  ) { 
    this.getData();
  }

  ngOnInit() {
  }

  getData() {
    this.http.post('/bonusRate/getBonusRateConfigs', {}, false).then(res => this.bonusRateList = res.result.list);
  }

  add() {
    this.bonusRateList.push({ name: this.bonusRateList.length + 1, rate: null, id: null })
  }

  saveLoading: boolean;
  save() {
    this.saveLoading = true;
    this.http.post('/bonusRate/saveBonusRates', { paramJson: JSON.stringify(this.bonusRateList) }).then(res => {
      this.getData();
      this.saveLoading = false;
    }).catch(err => this.saveLoading = false);
  }

  delete() {
    if (this.bonusRateList[this.bonusRateList.length - 1].id) {
      this.http.post('/bonusRate/removeBonusRate', { id: this.bonusRateList[this.bonusRateList.length - 1].id }).then(res => {
        this.bonusRateList.splice(this.bonusRateList.length - 1, 1);
      })
    } else {
      this.bonusRateList.splice(this.bonusRateList.length - 1, 1);
    }
  }

}
