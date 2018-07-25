import { HttpClient } from '@angular/common/http';
import { AutographService } from './../autograph.service';
import { AppState } from './../../../core/reducers/reducers-config';
import { Store } from '@ngrx/store';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { YlbbResponse } from 'src/app/ng-relax/services/http.service';
import { NzMessageService } from 'ng-zorro-antd';
import QRCode from 'qrcode'

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  /* -------- 当前页 -------- */
  currentPage = 0;

  /* -------- 商品列表 -------- */
  commodityItems: any[] = [];
  productItems: any[] = []

  /* -------- 支付方式 -------- */
  payType;

  sign;
  domain;

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder = new FormBuilder(),
    private store: Store<AppState>,
    private autograph: AutographService,
    private httpClient: HttpClient,
    private message: NzMessageService
  ) { 
    this.formGroup = this.fb.group({
      shopName: [{ disabled: true, value: '' }],
      shopUserName: [{ disabled: true, value: '' }],
      orderPhone: [, [Validators.required, Validators.pattern(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/)]],
      remarks: [],
      commodity: [, [Validators.required]],
      productMoneryId: [, [Validators.required]]
    });
    this.store.select('userInfoState').subscribe(res => {
      this.formGroup.patchValue({ shopName: res.store['shopName'], shopUserName: res.name });
    });
    this.autograph.getAutograph().then(res => {
      this.sign = res;
      this.getCommodity();
    })
    this.domain = this.autograph.domain;

    this.formGroup.get('commodity').valueChanges.subscribe(res => {
      this.httpClient.post<any>(`${this.domain}/product/money/all/${JSON.stringify(Object.assign(this.sign, { productId: res }))}`, {}).subscribe(res => {
        res.code == 1000 && (this.productItems = res.result);
      })
    })
  }

  getCommodity() {
    this.httpClient.post<YlbbResponse>(`${this.domain}/product/name/all/${JSON.stringify(this.sign)}`, {}).subscribe(res => {
      res.code == 1000 && (this.commodityItems = res.result);
    })
  }

  confirmLoading = false;
  confirmPrice() {
    if (this.formGroup.valid) {
      this.confirmLoading = true;
      this.httpClient.post<YlbbResponse>(`${this.domain}/order/add/${JSON.stringify(Object.assign(this.sign, this.formGroup.value))}`, {}).subscribe(res => {
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
        this.currentPage = this.currentPage + 1;
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
      payfrom: 'ERP'
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
        this.paymentTime = this.paymentTime -1;
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
  private _selectPaymentResult() {
    if (this.paymentResult == 0) {
      setTimeout(() => {
        this.httpClient.post<any>(`${this.domain}/status/${JSON.stringify(Object.assign(this.sign, {
          orderNo: this.orderDetail.orderNo
        }))}`, {}).subscribe(res => {
          if (res) {
            this.currentPage = this.currentPage + 1;
            this.paymentResult = 1;
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

}