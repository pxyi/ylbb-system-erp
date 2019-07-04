import { ListPageSimpComponent } from './../../../ng-relax/components/list-page-simp/list-page.component';
import { QueryNode } from './../../../ng-relax/components/query/query.component';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalService, NzMessageService, NzDrawerService } from 'ng-zorro-antd';
import { PreviewComponent } from './preview/preview.component';

@Component({
  selector: 'app-writeoff',
  templateUrl: './writeoff.component.html',
  styleUrls: ['./writeoff.component.less']
})
export class WriteoffComponent implements OnInit {

  @ViewChild('listPage') listPage: ListPageSimpComponent;

  queryNode: QueryNode[] = [
    {
      label: '来源',
      key: 'activityId',
      type: 'select',
      optionsUrl: '/activity/getActivitySource',
      optionKey: { label: 'activityHeadline', value: 'id' }
    },
    {
      label: '手机号',
      key: 'phoneNum',
      type: 'input'
    }
  ];

  amountSum = { totalAmount: 0, totalBalance: 0 };

  communityList: any[] = [];

  constructor(
    private http: HttpService,
    private modal: NzModalService,
    private message: NzMessageService,
    private drawer: NzDrawerService
  ) {
    /* ----------------------- 获取该门店下所有小区 ----------------------- */
    this.http.post('/yeqs/member/communityList').then(res => {
      this.communityList = res.result;
    });

    this.http.post('/verification/amountSum').then(res => this.amountSum = res.result);
  }

  ngOnInit() {
  }

  couponCode: string;
  searchLoading: boolean;
  search() {
    if (this.couponCode) {
      this.searchLoading = true;
      this.http.post('/activity/checkVerification', { code: this.couponCode }).then(res => {
        this.searchLoading = false;
        if (res.code == 1000) {
            
          this.drawer.create({
            nzTitle: '用户验证',
            nzWidth: 420,
            nzContent: PreviewComponent,
            nzContentParams: { voucherInfo: res.result.voucherInfo, code: this.couponCode }
          }).afterClose.subscribe(res => {
            if (res) {
              this.listPage.eaTable._request();
              this.couponCode = '';
            }
          });

        } else {
          this.message.warning(res.info)
        }

      })
    } else {
      this.message.warning('请输入劵号');
    }
  }

  putForward() {
    this.modal.warning({ nzTitle: '温馨提示', nzContent: '提现功能正在开发中，敬请期待...' });
  }

}
