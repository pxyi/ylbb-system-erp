import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Md5 } from "ts-md5/dist/md5";
import { AppState } from '../../core/reducers/reducers-config';

@Injectable()
export class AutographService {

  domain = 'http://tpay.beibeiyue.com/pay';

  getAutograph(): Promise<object> {
    return new Promise((resolve, reject) => {
      this.http.post<any>('/payment/intoOnlinePayment', {}).subscribe(res => {
        let nowDate = new Date().getTime();
        this.store.select('userInfoState').subscribe((userInfo: any) => {
          resolve({
            sign: Md5.hashStr(res.result.sign + nowDate),
            time: nowDate,
            shopId: userInfo.store.id,
            shopName: userInfo.store.shopName,
            loginId: userInfo.id,
            loginName: userInfo.name,
            productCount: 1,
            orderFrom: 'ERP'
          })
        }, err => reject(err));
      }, err => reject(err));
    })
  }

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) { }
}