import { AutographService } from './../autograph.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryNode, QueryComponent } from 'src/app/ng-relax/components/query/query.component';
import { YlbbResponse } from 'src/app/core/http.intercept';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.less']
})
export class RecordComponent implements OnInit {

  @ViewChild('eaQuery') eaQuery: QueryComponent;

  queryNode: QueryNode[] = [
    {
      label: '业务类型',
      type: 'select',
      key: 'productId',
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
      options: [{ name: '失败', id: 0 }, { name: '成功', id: 1 }],
      key: 'payStatus'
    }
  ];

  sign;


  domain = environment.domainPay

  _pageInfo = {
    loading: false,
    pageSize: 10,
    pageNo: 1,
    totalPage: 0
  };

  constructor(
    private http: HttpClient,
    private autograph: AutographService
  ) {
    this._getSign();
  }

  ngOnInit() {
  }

  private _getSign() {
    this.autograph.getAutograph().then(res => {
      this.sign = res;
      this.request();
      this.http.post<YlbbResponse>(`${this.domain}/product/name/all/${JSON.stringify(this.sign)}`, {}).subscribe(category => {
        this.eaQuery.node.map(res => {
          if (res.key === 'productId') {
            res.options = category.result;
          }
          return res;
        })
      })
    });
  }

  dataSet: any[];
  queryParams = {};
  query(e) {
    this.queryParams = e;
    this._pageInfo.pageNo = 1;
    this.request();
  }

  request(e?) {
    if (e) { this._pageInfo.pageNo = e };
    this._pageInfo.loading = true;
    this.http.post<YlbbResponse>(`${this.domain}/order/erp/${JSON.stringify(Object.assign(this.queryParams, this._pageInfo, this.sign))}`, {}).subscribe(res => {
      if (res.code == 1000) {
        this.dataSet = res.result.ordersList;
        this._pageInfo.totalPage = res.result.sumSize;
      }
      this._pageInfo.loading = false;
    })
  }

}
