import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sop',
  templateUrl: './sop.component.html',
  styleUrls: ['./sop.component.less']
})
export class SopComponent implements OnInit {

  @Output() next: EventEmitter<number> = new EventEmitter();

  dataSet: any[] = [];

  constructor(
    private http: HttpService
  ) {
    this.http.post('/shopTask/listShopTask').then(res => {
      this.dataSet = res.result;
    });
  }

  ngOnInit() {
  }

  statusChange(data) {
    this.http.post('/shopTask/updateTaskList', { id: data.id, status: data.status == 0 ? 1 : 0 }).then(res => data.status = data.status == 0 ? 1 : 0);
  }

}
