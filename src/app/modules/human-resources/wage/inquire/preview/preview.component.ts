import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/ng-relax/services/http.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.less']
})
export class PreviewComponent implements OnInit {

  @Input() dataInfo: any = {};

  detail = {
    payrollRecord: [],
    addTypes: [],
    subTypes: [],
    others: [],
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnInit() {
    this.http.post('/payrollRecordDetail/getPayrollRecordDetail', {
      paramJson: JSON.stringify({ employeeId: this.dataInfo.employeeId, month: this.dataInfo.month })
    }, false).then(res => {
      if (res.code == 1000) {
        res.result.payrollRecord = [res.result.payrollRecord];
        this.detail = res.result;
      }
    })
  }

}
