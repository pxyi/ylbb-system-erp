import { ConfigureComponent } from './configure/configure.component';
import { NzDrawerService, NzMessageService } from 'ng-zorro-antd';
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
    private drawer: NzDrawerService,
    private message: NzMessageService
  ) { }

  dataSet: any[];

  ngOnInit() {
  }

  ready(e) {
    e.map((d, i) => d.index = i + 1);
    this.dataSet = e;
  }

  update(data) {
    if (data.edit) {
      if (!data.planName.length) {
        this.message.warning('请输入方案名称');
      } else if (!data.startDate.length) {
        this.message.warning('请输入方案开始时间');
      } else {
        data.loading = true;
        this.http.post('/reserveCommonConfig/saveConfigPlan', { paramJson: JSON.stringify(data) }).then(res => {
          data.edit = false;
          data.loading = false;
        })
      }
    } else {
      data.edit = true;
    }
  }

  dateChange(e, data) {
    data.startDate = this.format.transform(e, 'yyyy-MM-dd');
  }


  configure(id) {
    const drawerRef = this.drawer.create({
      nzTitle: '方案详情',
      nzWidth: 700,
      nzContent: ConfigureComponent,
      nzContentParams: { id }
    });

  }

}
