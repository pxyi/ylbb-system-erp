import { ConfigComponent } from './config/config.component';
import { NzModalService, NzDrawerService } from 'ng-zorro-antd';
import { HttpService } from './../../../../ng-relax/services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  loading: boolean;

  dataSet: any[] = [];

  constructor(
    private http: HttpService,
    private modal: NzModalService,
    private drawer: NzDrawerService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(data = {}) {
    this.loading = true;
    this.http.post('/reserveCommonConfig/configList', { paramJson: JSON.stringify(data) }, false).then(res => {
      this.loading = false;
      res.code == 1000 && (this.dataSet = res.result);
    }).catch(err => this.loading = false);
  }

  init() {
    this.modal.confirm({
      nzTitle: '<i>初始化预约日班表?</i>',
      nzContent: '<b>初始化动作将清除已有的预约日班表数据，根据基础配置重新设定日班表。确定初始化日班表？</b>',
      nzMaskClosable: true,
      nzOnOk: () => { this.http.post('/reserveCommonConfig/init') }
    });
  }
  
  
  config() {
    this.drawer.create({
      nzTitle: '方案配置',
      nzContent: ConfigComponent,
      nzWidth: 820,
      nzBodyStyle: {
        'padding-bottom': '53px'
      }
    });
  }

}
