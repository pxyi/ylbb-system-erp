import { NzDrawerService , NzMessageService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { PreviewComponent } from './preview/preview.component';

@Component({
  selector: 'app-inquire',
  templateUrl: './inquire.component.html',
  styleUrls: ['./inquire.component.less']
})
export class InquireComponent implements OnInit {

  showPopover: boolean;
  generateLoading: boolean;

  generateMonth;

  constructor(
    private http: HttpService,
    private format: DatePipe,
    private drawer: NzDrawerService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
  }

  generate() {
    this.generateLoading = true;
    this.http.post('/payroll/generatePayroll', {
      month: this.format.transform(this.generateMonth, 'yyyy-MM')
    }).then(res => {
      this.generateLoading = false;
      if(res.code == 1000){
        this.message.success(res.info);
      }else{
        this.message.error(res.info);
      }
      
    }).catch(err => this.generateLoading = false);
  }

  _disabledDate(current: Date): boolean {
    return current && current.getTime() > Date.now();
  }

  preview({ dataInfo }) {
    this.drawer.create({
      nzWidth: 720,
      nzTitle: `工资明细（${dataInfo.employeeName}）`,
      nzContent: PreviewComponent,
      nzContentParams: { dataInfo }
    })
  }

}
