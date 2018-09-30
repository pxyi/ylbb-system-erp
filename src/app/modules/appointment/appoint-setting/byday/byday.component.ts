import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-byday',
  templateUrl: './byday.component.html',
  styleUrls: ['./byday.component.scss']
})
export class BydayComponent implements OnInit {

  dataSet: any[] = [];
  thead: any[] = [];
  loading: boolean;

  constructor(
    private http: HttpService
  ) { }

  ngOnInit() {
    this.getData();
  }
  
  getData(params = {}) {
    this.loading = true;
    this.http.post('/reserveDayConfig/list', { paramJson: JSON.stringify(params) }, false).then(res => {
      this.dataSet = res.result.list;
      this.thead = res.result.date;
      this.loading = false;
    });
  }

  /* ------------------------ 门店休息 ------------------------ */
  rest(day) {
    this.http.post('/reserveDayConfig/remove', { day }).then(res => {});
  }
 
}
