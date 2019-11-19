import { AppState } from './../../../core/reducers/reducers-config';
import { Store } from '@ngrx/store';
import { NzDrawerService } from 'ng-zorro-antd';
import { HttpService } from './../../../ng-relax/services/http.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateComponent } from '../create/create.component';
import { UpdatahtmlComponent } from '../updatahtml/updatahtml.component';

@Component({
  selector: "app-activity",
  templateUrl: "./activity.component.html",
  styleUrls: ["./activity.component.less"]
})
export class ActivityComponent implements OnInit {

  /* -------- 模板集合 -------- */
  templateList: any[] = [];

  loading: boolean;

  /* -------- 查询条件 -------- */
  queryForm = {
    templateHeadline: null,
    templateType: null
  };

  /* -------- 场景集合 -------- */
  templateTypeList: any[];

  constructor(
    private http: HttpService,
    private drawer: NzDrawerService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.http.post('/activity/getActivityTypes').then(res => this.templateTypeList = [{ templateLabel: '全部', templateType: null }, ...res.result]);
  }

  storeId: number;
  ngOnInit() {
    this.searchSubmit();
    this.store.select('userInfoState').subscribe(res => this.storeId = res.store.id);
  }

  /* --------------------- 获取活动列表 --------------------- */
  searchSubmit(): void {
    if (!this.loading) {
      this.loading = true;
      let params = JSON.parse(JSON.stringify(this.queryForm));
      Object.keys(params).map(key => (params[key] == '' || params[key] == null) && delete params[key])
      this.http.post('/activity/getActivityTemplates', { paramJson: JSON.stringify(params) }, false).then(res => {
        this.loading = false;
        this.templateList = res.result || [];
      });
    }
  }

  join(activityInfo) {
    this.http.post('/activity/checkBasicConfig').then(res => {
      if (res.result) {
        this.drawer.create({
          nzWidth: 720 + 400,
          nzClosable: false,
          nzContent: CreateComponent,
          nzContentParams: { activityInfo }
        })
      } else {
        this.router.navigate(['/home/configuration/store', { is: true }]);
      }
    })
  }
  updataHTML(activityInfo){
    this.drawer.create({
      nzWidth: 720 + 400,
      nzClosable: false,
      nzContent: UpdatahtmlComponent,
      nzContentParams: { activityInfo }
    })
  }

  encodeURIComponent(str) {
    return encodeURIComponent(str);
  }

}
