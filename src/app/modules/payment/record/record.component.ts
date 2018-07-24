import { AppState } from './../../../core/reducers/reducers-config';
import { YlbbResponse } from './../../../ng-relax/services/http.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryNode, QueryComponent } from 'src/app/ng-relax/components/query/query.component';
import { Md5 } from "ts-md5/dist/md5";
import { Store } from '@ngrx/store';
import { PageInfo } from 'src/app/ng-relax/components/table/table.component';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {

  @ViewChild('eaQuery') eaQuery: QueryComponent;

  queryNode: QueryNode[] = [
    {
      label: '业务类型',
      type : 'select',
      key: 'code',
      optionKey: { label: 'productName', value: 'id' }
    },
    {
      label: '交易时间',
      type: 'datepicker',
      key: 'orderCreate'
    },
    {
      label: '交易状态',
      type: 'select',
      options: [ { name: '失败', id: 0 }, { name: '成功', id: 1 } ],
      key: 'payStatus'
    }
  ];

  autograph: any = { sign: '', time: new Date().getTime(), shopId: null };


  domain = 'http://tpay.beibeiyue.com/pay';

  _pageInfo: PageInfo = new PageInfo();

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) {
    this._getSign();

    this.store.select('userInfoState').subscribe((res: any) => {
      this.autograph.shopId = res.store.id;
    });
  }

  ngOnInit() {
  }

  private async _getSign() {
    let res: any = await this.http.post('/payment/intoOnlinePayment', {}).toPromise();
    this.autograph.sign = Md5.hashStr(res.result.sign + this.autograph.time);
    this.request();
    let category = await this.http.post<YlbbResponse>(`${this.domain}/product/name/all/${JSON.stringify(this.autograph)}`, {}).toPromise();
    category.code == 1000 && this.eaQuery.patchValue('code', { options: category.result });
  }

  dataSet: any[];
  queryParams = {};
  query(e) {
    this.queryParams = e;
    this.request();
  }

  request() {
    this._pageInfo.loading = true;
    this.http.post<YlbbResponse>(`${this.domain}/order/erp/${JSON.stringify(Object.assign(this.queryParams, this.autograph))}`, {}).subscribe(res => {
      if (res.code == 1000) {
        this.dataSet = res.result.ordersList;
        this._pageInfo.totalPage = res.result.sumSize;
        this._pageInfo.pageNum = res.result.pageSum;
      }
      this._pageInfo.loading = false;
    })
  }

}
