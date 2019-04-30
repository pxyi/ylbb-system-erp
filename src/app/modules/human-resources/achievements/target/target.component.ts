import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { NzDrawerService } from 'ng-zorro-antd';
import { UpdateComponent } from './update/update.component';

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.less']
})
export class TargetComponent implements OnInit {

  showInfo: boolean;

  managementInfo: any = {};

  constructor(
    private http: HttpService,
    private drawer: NzDrawerService
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
  }

  setGoals(isInit?: boolean) {
    const drawer = this.drawer.create({
      nzTitle: '绩效管理-本月业绩目标设置',
      nzWidth: 960,
      nzContent: UpdateComponent,
      nzContentParams: { isInit }
    });
    drawer.afterClose.subscribe(res => this.getData());
  }

}
