import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Md5 } from "ts-md5/dist/md5";
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { AppState } from 'src/app/core/reducers/reducers-config';

@Injectable()
export class AutographService {

  getAutograph(): Promise<object> {
    return new Promise((resolve, reject) => {
      this.http.post('/payment/intoOnlinePayment').then(res => {
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
            orderFrom: 'ERP',
            brandId: userInfo.store.shopBrand.id,
            brandName: userInfo.store.shopBrand.brandName
          })
        }, err => reject(err));
      }, err => reject(err));
    })
  }

  constructor(
    private http: HttpService,
    private store: Store<AppState>
  ) { }
}
