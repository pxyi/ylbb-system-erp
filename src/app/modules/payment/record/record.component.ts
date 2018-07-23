import { YlbbResponse } from './../../../ng-relax/services/http.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { QueryNode } from 'src/app/ng-relax/components/query/query.component';
import { TheadNode } from 'src/app/ng-relax/components/table/table.component';
import { Md5 } from "ts-md5/dist/md5";

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {


  queryNode: QueryNode[] = [
    {
      label: '业务类型',
      type : 'input',
      key: 'code',
      placeholder: '请输入登录名'
    },
    {
      label: '中文名',
      type: 'input',
      key: 'name',
      placeholder: '请输入中文名'
    }
  ]

  tableThead: TheadNode[] | string[] = ['登录名', '中文名', '邮箱', '创建日期', '状态', '操作'];

  sign;

  categoryOptions: any[] = [];

  domain = 'http://tpay.beibeiyue.com/pay';

  constructor(
    private http: HttpClient
  ) {
    this._getSin();
  }

  ngOnInit() {
  }

  private async _getSin() {
    let res: any = await this.http.post('/payment/intoOnlinePayment', {}).toPromise();
    let nowDate = new Date().getTime();
    this.sign = Md5.hashStr(res.rseult + nowDate);
    let category = await this.http.post<YlbbResponse>(`${this.domain}/product/name/all/${JSON.stringify({ sign: this.sign, time: nowDate })}`, {}).toPromise();
    category.code == 100 && (this.categoryOptions = category.result);
  }

}
