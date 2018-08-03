import { NzMessageService } from 'ng-zorro-antd';
import { CacheService } from './../../../ng-relax/services/cache.service';
import { HttpService } from './../../../ng-relax/services/http.service';
import { AppState } from './../../../core/reducers/reducers-config';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: "app-activity",
  templateUrl: "./activity.component.html",
  styleUrls: ["./activity.component.scss"]
})
export class ActivityComponent implements OnInit {
  @ViewChild("breadcrumbTmpt") breadcrumbTmpt: TemplateRef<any>;

  /* -------- 查询条件 场景/节日集合 -------- */
  activityItems: any[] = [];
  activityLoading: boolean;
  queryForm = {
    name: "",
    scencesId: [],
    festivalId: []
  };
  sceneItems: any[] = [];
  festivalItems: any[] = [];

  constructor(
    private store: Store<AppState>,
    private http: HttpService,
    private cache: CacheService,
    private message: NzMessageService
  ) {
    this.cache.get("/market/scencesList").subscribe(res => (this.sceneItems = res));
    this.cache.get("/market/festivalList").subscribe(res => (this.festivalItems = res));
  }

  ngOnInit() {
    this.store.dispatch({
      type: "setBreadcrumb",
      payload: this.breadcrumbTmpt
    });
    this.searchSubmit();
  }

  /* --------------------- 选择查询条件 --------------------- */
  queryCheckChange(checked: boolean, control: string, id) {
    if (checked) {
      this.queryForm[control].push(id);
    } else {
      this.queryForm[control].splice(this.queryForm[control].indexOf(id), 1);
    }
    this.searchSubmit();
  }
  queryCheckAll(checked: boolean, control: string): void {
    this.queryForm[control] = [];
    if (checked) {
      this.searchSubmit();
    }
  }

  /* --------------------- 获取活动列表 --------------------- */
  searchSubmit(): void {
    if (this.activityLoading) {
      return;
    }
    this.activityLoading = true;
    let params = JSON.parse(JSON.stringify(this.queryForm));
    params.scencesId = params.scencesId.join(",");
    params.festivalId = params.festivalId.join(",");
    this.http.post("/market/marketingList", { paramJson: JSON.stringify(params) }, false).then(
      res => {
        this.activityLoading = false;
        if (res.code == 1000) {
          this.activityItems = res.result.list;
        }
      },
      err => {
        this.activityLoading = false;
      }
    );
  }

  currentActivity;
  activityJoinForm = {
    coupon: null,
    originalPrice: null,
    bossPhone: null
  }
  showJoinActivity: boolean;
  joinActivity() {
    if (this.currentActivity.loading) { return; }

    if (!(this.activityJoinForm.coupon > 0)) { this.message.warning('请输入正确的代金券价格'); return; }
    if (!(this.activityJoinForm.originalPrice > 0)) { this.message.warning('请输入正确的活动价格'); return; }
    if (!(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/).test(this.activityJoinForm.bossPhone)) { this.message.warning('请输入正确的电话号码'); return; }

    Object.keys(this.activityJoinForm).map(res => {
      this.activityJoinForm[res] = Number(this.activityJoinForm[res]);
    });

    this.currentActivity.loading = true;
    let params = Object.assign({ id: this.currentActivity.id }, this.activityJoinForm);
    this.http.post('/market/joinActivity', { paramJson: JSON.stringify(params) }, false).then((res: any) => {
      this.message.create(res.code == 1000 ? 'success' : 'warning', res.info);
      if (res.code == 1000) { this.searchSubmit(); }
      this.currentActivity.loading = false;
      this.showJoinActivity = false;
    }, err => {
      this.currentActivity.loading = false;
      this.showJoinActivity = false;
    })
  }

  /* ---------------------- 取消参加 ---------------------- */
  cancelActivity(item): void {
    if (item.loading) {
      return;
    }
    item.loading = true;
    this.http.post("/market/cancelActivity", { paramJson: JSON.stringify({ id: item.id }) }, false).then(
      res => {
        this.message.create(
          res.code == 1000 ? "success" : "warning",
          res.info
        );
        item.loading = false;
        if (res.code == 1000) {
          item.joinStatus = 0;
        }
      },
      err => {
        item.loading = false;
      }
    );
  }
}
