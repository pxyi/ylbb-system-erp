import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { DrawerCreate } from 'src/app/ng-relax/decorators/drawer/create.decorator';
import { ConsumptionComponent } from '../../public/consumption/consumption.component';

@Component({
  selector: 'app-paycard',
  templateUrl: './paycard.component.html',
  styleUrls: ['./paycard.component.less']
})
export class PaycardComponent implements OnInit {

  memberCard: number;

  dataSet: any[] = [];

  loading: boolean;

  constructor(
    private http: HttpService
  ) { }

  ngOnInit() {
  }


  searchSubmit() {
    this.loading = true;
    this.http.post('/payofcard/getpayofcardlist', {
      paramJson: JSON.stringify({ cardNo: this.memberCard })
    }, false).then(res => {
      this.loading = false;
      this.dataSet = res.code == 1000 ? res.result : [];
      this.dataSet[0] && this.consumption({ consumptionInfo: this.dataSet[0] });
    }, err => this.loading = false);
  }
  
  @DrawerCreate({ title: '添加消费', content: ConsumptionComponent }) consumption: ({ consumptionInfo: object }) => void;
}
