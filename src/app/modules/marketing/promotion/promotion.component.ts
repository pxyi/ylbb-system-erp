import { AppState } from 'src/app/core/reducers/reducers-config';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService, NzDrawerService } from 'ng-zorro-antd';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { CreateComponent } from '../create/create.component';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.less']
})
export class PromotionComponent implements OnInit {
  storeId: number;
  evaluate: any[] = [];
  listOfData: any[] = [];
  totalEvaluate = 0;
  evaluatePageNum = 1;
  activityPageNum = 1;
  totalList = 0;
  isVisible: boolean;
  itemsImg: string;
  constructor(
    private http: HttpService,
    private message: NzMessageService,
    private store: Store<AppState>,
    private drawer: NzDrawerService
  ) {

  }

  ngOnInit() {
    this.store.select('userInfoState').subscribe(res => { this.storeId = res.store.id; this._templateInit() });
    this.getEvaluate();
    this.getActivity();
  }
  openItemImg(img) {
    this.isVisible = true;
    this.itemsImg = img;
  }
  /* --------------------- 获取评价列表 --------------------- */
  getEvaluate(): void {
    this.http.post('/activityInfoForStore/assessList', { pageSize: 10, pageNum: this.evaluatePageNum }, false).then(res => {
      if (res.code == 1000) {
        res.result.list.map(item => {
          item.commentPhoto = item.commentPhoto.split(',');
        })
        this.evaluate = res.result.list;
        this.totalEvaluate = res.result.pageInfo.totalCount;

      }
    });
  }
  /* --------------------- 获取活动列表 --------------------- */
  getActivity(): void {
    this.http.post('/activityInfoForStore/storeActivityList', { pageSize: 20, pageNum: this.activityPageNum }, false).then(res => {
      if (res.code == 1000) {
        this.listOfData = res.result.list;
        this.totalList = res.result.pageInfo.totalCount;
      }
    });
  }
  /* --------------------- 评价选择页码 --------------------- */
  evaluateChange(num) {
    this.evaluatePageNum = num;
    this.getEvaluate();
  }
  listChange(num) {
    this.activityPageNum = num;
    this.getActivity();
  }
  /* --------------------- 更改评论状态 --------------------- */
  evaluateModel(assessId, isShow) {
    this.http.post('/activityInfoForStore/updateAssessStatus', { assessId, isShow }, false).then(res => {
      if (res.code == 1000) {
        this.message.create('success', '操作成功');
        this.getEvaluate();
      }
    });
  }
  /*-------------------------更改活动状态-----------------------------*/
  activityStatus(activityId, isShows) {
    this.http.post('/activityInfoForStore/updateIsShowStatus', { activityId, isShow: isShows == 1 ? 0 : 1 }, false).then(res => {
      if (res.code == 1000) {
        this.message.create('success', '操作成功');
        this.getActivity();
      }
    });
  }
  @ViewChild('preview') preview;
  private _templateInit() {
    /* ------------------- 预览H5活动 ------------------- */
    let iframe = document.createElement('iframe');
    iframe.width = '375';
    iframe.height = '602';
    iframe.frameBorder = '0';
    iframe.scrolling = 'no';
    iframe.src = 'http://wx.beibeiyue.com/popopooc/indexdemo.html?storeId=' + this.storeId;
    this.preview.nativeElement.appendChild(iframe);
  }
  update(activityId) {
    const drawer = this.drawer.create({
      nzWidth: 720 + 400,
      nzClosable: false,
      nzContent: CreateComponent,
      nzContentParams: { activityId }
    });
    drawer.afterClose.subscribe(res => { this.getActivity() });
  }
}
