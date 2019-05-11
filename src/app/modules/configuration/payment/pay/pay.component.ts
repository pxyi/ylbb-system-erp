import { HttpClient } from '@angular/common/http';
import { AutographService } from './../autograph.service';
import { Store } from '@ngrx/store';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import QRCode from 'qrcode';
import { AppState } from 'src/app/core/reducers/reducers-config';
import { YlbbResponse } from 'src/app/core/http.intercept';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.less']
})
export class PayComponent implements OnInit, OnDestroy {

  /* -------- 当前页 -------- */
  currentPage = 0;

  /* -------- 商品列表 -------- */
  commodityItems: any[] = [];
  productItems: any[] = []

  /* -------- 支付方式 -------- */
  payType;

  sign;
  domain = environment.domainPay;

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder = new FormBuilder(),
    private store: Store<AppState>,
    private autograph: AutographService,
    private httpClient: HttpClient,
    private message: NzMessageService
  ) {
    this.formGroup = this.fb.group({
      commodity: [],
      productMoneryId: [],
      orderPhone: [, [Validators.required, Validators.pattern(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/)]],
      remarks: [],

      brandId: [],
      shopName: [],
      shopUserName: [],
      productName: [],
      productBody: [],
      productMoney: []
    });
    this.store.select('userInfoState').subscribe(res => {
      this.formGroup.patchValue({ shopName: res.store['shopName'], shopUserName: res.name });
    });
    this.autograph.getAutograph().then(res => {
      this.sign = res;
      this.getCommodity();
    });
  }

  getCommodity() {
    this.httpClient.post<YlbbResponse>(`${this.domain}/product/name/all/${JSON.stringify(this.sign)}`, {}).subscribe(res => {
      if (res.code == 1000) {
        this.commodityItems = res.result;
        this.commodityItems.map(commodity => {
          this.httpClient.post<any>(`${this.domain}/product/money/all/${JSON.stringify(Object.assign(this.sign, { productId: commodity.id }))}`, {}).subscribe(res => {
            commodity.children = res.result;
          })
        });
      }
    })
  }

  selectCommodity(obj, commodity) {
    this.httpClient.post<YlbbResponse>(`${this.domain}/product/name/id/${JSON.stringify(Object.assign(this.sign, { id: obj.productId }))}`, {}).subscribe(res => {
      this.currentPage++;
      obj.productMoneryId = obj.id;
      obj.commodity = commodity;
      delete res.result.remarks;
      this.formGroup.patchValue(Object.assign(obj, res.result));
    })
  }

  confirmLoading = false;
  confirmPrice() {
    if (this.formGroup.valid) {
      this.confirmLoading = true;
      let params = {
        commodity: this.formGroup.value.commodity,
        productMoneryId: this.formGroup.value.productMoneryId,
        remarks: this.formGroup.value.remarks,
        orderPhone: this.formGroup.value.orderPhone
      }
      this.httpClient.post<YlbbResponse>(`${this.domain}/order/add/${JSON.stringify(Object.assign(this.sign, params))}`, {}).subscribe(res => {
        if (res.code == 1000) {
          this.getOrderDetail(res.result);
        } else {
          this.message.warning(res.info);
        }
      })
    } else {
      for (let i in this.formGroup.controls) {
        this.formGroup.controls[i].markAsDirty();
        this.formGroup.controls[i].updateValueAndValidity();
      }
    }
  }

  orderDetail;
  getOrderDetail(orderNo) {
    this.httpClient.post<YlbbResponse>(`${this.domain}/order/id/${JSON.stringify(Object.assign(this.sign, { orderNo }))}`, {}).subscribe(res => {
      if (res.code == 1000) {
        this.currentPage++;
        this.orderDetail = res.result;
        this.showPaymentQrcode = false;
      } else {
        this.message.warning(res.info);
      }
      this.confirmLoading = false;
    })
  }


  paymentResult: number = 0;
  showPaymentQrcode: boolean;
  showPaymentLoading: boolean;
  payment() {
    this.showPaymentLoading = true;
    this.showPaymentQrcode = true;
    this.httpClient.post<YlbbResponse>(`${this.domain}/${this.payType}/qr/${JSON.stringify(Object.assign(this.sign, {
      orderNo: this.orderDetail.orderNo,
      payTyep: 'zfbqr',
      payfrom: 0
    }))}`, {}).subscribe(res => {
      if (res.code == 1000) {
        this._qrcode(res.result);
      } else {
        this.message.warning(res.info);
      }
    })
  }
  paymentTime: number = 30 * 60;
  private _qrcode(code) {
    let canvas = document.getElementById('paycode')
    QRCode.toCanvas(canvas, code, err => {
      if (!err) {
        this.showPaymentLoading = false;
        this._surplusPaymentTime();
        this._selectPaymentResult();
      }
    })
  }
  paymentTimeMM: number = 0;
  paymentTimeSS: number = 0;
  private _surplusPaymentTime() {
    if (this.paymentTime > 0) {
      setTimeout(() => {
        this.paymentTime = this.paymentTime - 1;
        this.paymentTimeMM = Math.floor(this.paymentTime / 60);
        this.paymentTimeSS = this.paymentTime % 60;
        this._surplusPaymentTime();
      }, 1000);
    } else {
      this.paymentTime = 30 * 60;
      this.currentPage = this.currentPage + 1;
      this.paymentResult = -1;
    }
  }

  private _pollingPaymentResult;
  private _selectPaymentResult() {
    if (this.paymentResult == 0) {
      this._pollingPaymentResult = setTimeout(() => {
        this.httpClient.post<any>(`${this.domain}/status/${this.orderDetail.orderNo}`, {}).subscribe(res => {
          if (res && res.result) {
            this.currentPage = this.currentPage + 1;
            this.paymentResult = 1;
            clearTimeout(this._pollingPaymentResult);
          }
        })
        this._selectPaymentResult();
      }, 5000);
    }
  }

  confirmPay() {
    this.currentPage = this.currentPage + 1;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    clearTimeout(this._pollingPaymentResult);
  }

}
