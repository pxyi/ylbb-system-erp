import { NzMessageService, NzDrawerService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { HttpService } from './../../../../ng-relax/services/http.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ControlValid } from 'src/app/ng-relax/decorators/form/valid.decorator';
import { CommodityComponent } from './commodity/commodity.component';

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

  formGroup: FormGroup;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private message: NzMessageService,
    private drawer: NzDrawerService
  ) { 
    this.formGroup = this.fb.group({
      satisfaction: ['一般'],
      swimTeacherId: [],
      comment: [],
      cardPos: this.fb.array([]),

      paymentType: [2],
      price: [],
      payment: [, [Validators.required]],
    });
    /* -------------------- 获取下拉列表数据 -------------------- */
    this.http.post('/member/getStoreTeachers').then(res => {
      this.teacherList = res.result;
      this.formGroup.patchValue({ swimTeacherId: res.result[0].id });
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
      let price = 0;
      s.map(c => price += c.count * c.discountPrice);
      
      this.formGroup.patchValue({ price, payment: price });
    });
    /* -------------------- 监听实收金额变动 -------------------- */
    this.formGroup.controls['payment'].valueChanges.subscribe(v => {
      this.formGroup.patchValue({ changePrice: (Number(v) - this.formGroup.controls['price'].value || 0) });
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

  ngOnInit() {
    this.addKeypressEventListener(true);
  }

  addKeypressEventListener(isAdd?: boolean/* 添加/删除监听键盘时间 */) {
    document[isAdd ? 'addEventListener' : 'removeEventListener']('keypress', this.keypressEvent);
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
    this.addKeypressEventListener();
  }

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
          this.cardPos.value.map((s, i) => s.id === res.result[0].id && this.cardPos.controls[i].patchValue({ count: this.cardPos.value[i].count + 1, subtotal: this.cardPos.value[i].discountPrice * (this.cardPos.value[i].count + 1) })  );  
        } else {
          this.addCardPos(res.result[0]);
        }
      }
    })
  }

  payment(sweepCode: string) {
    console.log('触发提交表单事件：', sweepCode)
    if (this.cardPos.length) {

    } else {
      this.message.warning('请选择需要结算的商品！');
    }

    // this.changePrice = this.payment - this.price; //计算找零
    // var paramJson = {
    //   payment       : this.payment,                                      //实收金额
    //   price         : this.price,                                        //应收金额
    //   changePrice   : this.changePrice,                                  //找零
    //   paymentType   : this.paymentType,                                  //支付方式
    //   memberId      : this.consumptionInfo.id,                           //会员id
    //   cardId        : this.consumptionInfo.cardId,                       //会员卡id
    //   satisfaction  : this.singleTimeGroup.get('satisfaction').value,    //满意度
    //   swimTeacherId : this.singleTimeGroup.get('swimTeacherId').value,   //服务泳师
    //   comment       : this.singleTimeGroup.get('remarks').value || null, //备注
    //   cardPos       : []                                                 //购物车
    // }
    // //购物车列表放到cardPos中
    // for (let item of this.resultData) {
    //   var data={};
    //   data['id']            = item.id;          //商品id
    //   data['count']         = item.num;         //商品数量
    //   data['price']         = item.price;       //商品售价
    //   data['discountPrice'] = item.changePrice; //商品折扣价
    //   data['subtotal']      = item.subtotal;    //总价
    //   paramJson.cardPos.push(data);
    // }

    //haveCard等于1为会员
    // if (this.consumptionInfo.haveCard != 1) {
    //   delete paramJson.cardId;
    // }
    // // console.log(paramJson);
    // this.http.post('/customer/commodityConsumer', { paramJson: JSON.stringify(paramJson) }).then(res => {
    //   if (res.code == 1000) {
    //     this.orderNo = res.result.orderNo;
    //     //获取消费剩余金额
    //     this.preferential = res.result.preferential;//本次优惠
    //     this.message.create('success', '操作成功,请结算或展示付款码');

    //     /*---------------- 确定结算 ----------------*/
    //     this.http.post('/customer/payOrder', {
    //       payBarCode: this.code,        //付款码
    //       orderNo: this.orderNo,     //订单号
    //       payType: this.paymentType  //支付方式
    //     }).then(res => {
    //       if (res.code == 1000) {
    //         this.message.create('success', '付款成功');
    //         //清空
    //         this.code = '';
    //         this.startTime = undefined;
    //         this.endTime = undefined;
    //         this.isPay = false;
    //         //打印
    //         this.printTest();
    //       } else {
    //         this.message.create('warning', res.info);
    //         //清空
    //         this.code = '';
    //         this.startTime = undefined;
    //         this.endTime = undefined;
    //         this.isPay = false;
    //       }
    //     })

    //   } else {
    //     this.message.create('warning', res.info);
    //     //清空
    //     this.code = '';
    //     this.startTime = undefined;
    //     this.endTime = undefined;
    //     this.isPay = false;
    //   }

    // })
  }


  @ControlValid() valid: (key: string, type?: string) => boolean;

  clearCardPos() {
    this.formGroup.controls['cardPos'] = this.fb.array([]);
  }

}
