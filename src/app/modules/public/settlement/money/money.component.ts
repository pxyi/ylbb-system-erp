import { NzMessageService, NzDrawerService, NzDrawerRef } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ControlValid } from 'src/app/ng-relax/decorators/form/valid.decorator';
import { CommodityComponent } from './commodity/commodity.component';
import { format } from 'date-fns';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { sub, mul } from 'src/app/public/operation';

@Component({
  selector: 'app-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.less']
})
export class MoneyComponent implements OnInit, OnDestroy {

  @Input() consumptionInfo: any = {};

  private sweepCode: string = '';
  private keypressEventTime: number[] = [];

  teacherList: any[] = [];
  storeCardList: any[] = [];

  formGroup: FormGroup;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private message: NzMessageService,
    private drawer: NzDrawerService,
    private drawerRef: NzDrawerRef
  ) {
    /* -------------------- 获取下拉列表数据 -------------------- */
    this.http.post('/member/getStoreTeachers').then(res => {
      this.teacherList = res.result;
      this.formGroup.patchValue({ swimTeacherId: res.result[0].id });
    });
  }

  selectCardInfo: any = {};
  ngOnInit() {
    this.consumptionInfo.haveCard && this.http.post('/memberCard/getMemberCards', { memberId: this.consumptionInfo.memberId || this.consumptionInfo.id }).then(res => {
      this.storeCardList = res.result.filter(c => c.feeType == 1);
      if (this.storeCardList.length) {
        this.formGroup.patchValue({ cardId: this.storeCardList[0].id });
        this.selectCardInfo = this.storeCardList[0];
      }
    });

    this.addKeypressEventListener('add');

    this.formGroup = this.fb.group({
      memberId: [this.consumptionInfo.memberId || this.consumptionInfo.id],
      cardId: [this.consumptionInfo.cardCode || this.consumptionInfo.memberCard],
      satisfaction: ['一般'],
      swimTeacherId: [],
      comment: [],
      cardPos: this.fb.array([]),
      discountPrice: [],

      paymentType: [2],
      price: [],
      payment: [, [Validators.required]],
    });

    /* -------------------- 是否显示找零 -------------------- */
    this.formGroup.controls['paymentType'].valueChanges.subscribe(v => {
      if (v === 1) {
        this.formGroup.addControl('changePrice', this.fb.control(0));
      } else {
        this.formGroup.removeControl('changePrice');
      }
    });

    /* -------------------- 监听商品变更，计算应收金额 -------------------- */
    this.cardPos.valueChanges.subscribe(s => {
      let price = 0, discountPrice = 0;
      s.map(c => { price += mul(c.count, c.discountPrice); discountPrice += mul(c.count, (c.price - c.discountPrice)) });

      this.formGroup.patchValue({ price, payment: price, discountPrice });
    });
    /* -------------------- 监听实收金额变动 -------------------- */
    this.formGroup.controls['payment'].valueChanges.subscribe(v => {
      this.formGroup.patchValue({ changePrice: sub(Number(v), this.formGroup.controls['price'].value || 0) });
    });
  }

  /* 商品集合 */
  get cardPos(): FormArray { return this.formGroup.controls['cardPos'] as FormArray; }
  private addCardPos(commodityInfo) {
    this.cardPos.push(this.fb.group({
      barCode: [commodityInfo.barCode],
      name: [commodityInfo.name],
      id: [commodityInfo.id],
      count: [commodityInfo.count || 1], 
      price: [commodityInfo.price], 
      discountPrice: [commodityInfo.changePrice], 
      subtotal: [commodityInfo.changePrice],
    }));
  }

  addKeypressEventListener(event: 'add' | 'remove'/* 添加/删除监听键盘时间 */) {
    document[`${event}EventListener`]('keypress', this.keypressEvent);
  }
  private keypressEvent = (even) => {
    var ev = even.which;
    if (ev === 13) {
      if (this.keypressEventTime.length >= 18 && this.keypressEventTime[this.keypressEventTime.length - 1] - this.keypressEventTime[this.keypressEventTime.length - 18] < 800) {
        if (Number(this.sweepCode.substring(this.sweepCode.length - 18))) {
          this.payment(this.sweepCode.substring(this.sweepCode.length - 18));
          this.sweepCode = '';
          this.keypressEventTime = [];
        }
      } else if (this.keypressEventTime.length >= 13 && this.keypressEventTime[this.keypressEventTime.length - 1] - this.keypressEventTime[this.keypressEventTime.length - 13] < 500) {
        if (Number(this.sweepCode.substring(this.sweepCode.length - 13))) {
          this.queryCommodity(this.sweepCode.substring(this.sweepCode.length - 13));
          this.sweepCode = '';
          this.keypressEventTime = [];
        }
      }
    } else {
      this.keypressEventTime.push(Date.now());
      this.sweepCode = this.sweepCode + String.fromCharCode(ev);
    }

  }

  ngOnDestroy() {
    this.addKeypressEventListener('remove');
  }

  /* ------------ 根据文字搜索商品 ------------ */
  searchCommodity(name: string) {
    this.http.post('/commodity/getCommodities', { name, cardId: this.consumptionInfo.cardId }).then(res => {
      if (res.result.length) {
        this.drawer.create({
          nzTitle: '商品列表',
          nzWidth: 520,
          nzContent: CommodityComponent,
          nzContentParams: { commodityList: res.result }
        }).afterClose.subscribe(res => res && this.addCardPos(res))
      } else {
        this.message.warning('未搜索到相关商品');
      }
    });
  }

  queryCommodity(sweepCode: string) {
    this.http.post('/commodity/getCommodities', { cardId: this.consumptionInfo.cardId, barCode: sweepCode }).then(res => {
      if (res.result.length) {
        const isHave = this.cardPos.value.every(s => s.id === res.result[0].id);
        if (isHave && this.cardPos.value.length) {
          this.cardPos.value.map((s, i) => s.id === res.result[0].id && this.cardPos.controls[i].patchValue({ count: this.cardPos.value[i].count + 1, subtotal: mul(this.cardPos.value[i].discountPrice, (this.cardPos.value[i].count + 1)) })  );  
        } else {
          this.addCardPos(res.result[0]);
        }
      }
    })
  }

  get paymentType() { return this.formGroup.controls['paymentType'].value; }

  async payment(sweepCode: string) {
    if (this.cardPos.length) {
      const orderResult = await this.http.post('/customer/commodityConsumer', { paramJson: JSON.stringify(Object.assign({}, this.formGroup.value)) });

      const orderNo = orderResult.result.orderNo;
      const payResult = await this.http.post('/customer/payOrder', { payBarCode: sweepCode, orderNo, payType: this.formGroup.controls.paymentType.value });
      if (payResult.code == 1000) {
        this.message.success('交易成功！');
        this.print();
      } else {
        this.message.warning(payResult.info);
      }
    } else {
      this.message.warning('请选择需要结算的商品！');
    }
  }

  /* ------------- 打印 ------------- */
  async print() {
    this.drawerRef.close(true);
    const shopInfo = (await this.http.post('/activity/getBasicConfig')).result;

    const nowDate = format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    if (this.paymentType == 4) {
      /* ---- 如果为储值卡支付 ---- */
      const amount = (await this.http.post('/memberCard/getMemberCardInfo', { id: this.consumptionInfo.cardId })).result.amount;
      
    } else {

    }
  }


  @ControlValid() valid: (key: string, type?: string) => boolean;

  clearCardPos() {
    this.formGroup.controls['cardPos'] = this.fb.array([]);
  }

}
