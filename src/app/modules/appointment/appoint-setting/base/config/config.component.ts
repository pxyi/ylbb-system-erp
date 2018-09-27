import { ConfigureComponent } from './configure/configure.component';
import { NzDrawerService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
import { HttpService } from './../../../../../ng-relax/services/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  @ViewChild('drawerTemplate') drawerTemplate;
  loading: boolean;

  constructor(
    private http: HttpService,
    private format: DatePipe,
    private drawer: NzDrawerService
  ) { }

  dataSet: any[];

  ngOnInit() {
  }

  ready(e) {
    e.map((d, i) => d.index = i + 1);
    this.dataSet = e;
  }

  dateChange(e, data) {
    data.startDate = this.format.transform(e, 'yyyy-MM-dd');
  }


  configure(id) {
    const drawerRef = this.drawer.create({
      nzTitle: '方案详情',
      nzWidth: 700,
      nzContent: ConfigureComponent
    });

  }

}
