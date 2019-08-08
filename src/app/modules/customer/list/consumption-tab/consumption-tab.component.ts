import { Component, OnInit, Input, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { NzModalRef, NzDrawerRef, NzModalService, NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { ActivatedRoute } from '@angular/router';
import { DetailComponent } from 'src/app/modules/public/consumption/detail/detail.component';

@Component({
  selector: 'app-consumption-tab',
  templateUrl: './consumption-tab.component.html',
  styleUrls: ['./consumption-tab.component.less']
})
export class ConsumptionTabComponent implements OnInit, OnDestroy {

  /* ---------------- 耗卡start ---------------- */
  baseFormGroup: FormGroup;
  timesCountGroup: FormGroup;
  singleTimeGroup: FormGroup;

  teacherList: any[] = [];
  communityList: any[] = [];
  swimRingList: any[] = [];
  memberCardList: any[] = [];
  commoditieListdc: any[] = [];
  commoditieListjc: any[] = [];

  consumptionType: number;
  /* ---------------- 耗卡end ---------------- */

  @ViewChild('searchInput') searchInput;

  @ViewChild('el') el;

  @ViewChild('service') service;

  @Input() consumptionInfo;

  tplModal: NzModalRef;
  htmlModalVisible = false;
  disabled = false;
  switchValue = false;
  //商品还是耗卡 0商品 1耗卡
  nzSelectedIndex:number = 0;
  //搜索展示数据
  searchList:any[] = [];
  //tab标签
  position = 'left';
  //商品表格数据
  listOfData = [];
  //备注
  inputValue:string;
  //搜索框value
  searchData:string;
  //每次扫码的数字
  code:string = "";
  //扫码临时存储数据
  data:any = {};
  resultData = [];//处理后的数据数组
  //支付方式
  paymentType:number = 2; //1现金支付 2微信 3支付宝 4充值卡
  //支付方式文字
  paymentTypeText:string = '现金支付';
  //实收
  payment:any = '';
  //应收
  price:any = 0;
  //找零
  changePrice:any = 0;
  //是否提交购物车
  isSubmitShopCard = false;
  //总数数量
  numberOftotal:any = 0;
  //当前订单号
  orderNo:any = '';
  //剩余金额
  remainPrice:any = 0;
  //本次优惠
  preferential:any = 0;
  //付款码
  payCode:any = '';
  //订单是否提交(提交之后再扫就是付款码)

  //商品小票参数
  shopName:string;        //店名
  shopAddress:string;     //地址
  shopTel:string;         //预约电话
  time:string;            //时间
  username:string;        //名字
  phoneNumber:any;        //会员电话
  generalDiscount:string; //总优惠

  //服务小票参数
  cardInfo:string;        //会员卡
  remainTimes:string;     //剩余次数
  remainAmount:string;    //剩余金额
  expireDate:string;      //过期时间
  serviceName:string;     //服务名称
  consumption:string;     //消费金额
  deductionTimes:number;  //消费次数

  //会员信息
  memberInfo = {
    isHaveCard   : false, //是否是会员
    memberName   : '',    //名字
    memberType   : '',    //卡类型
    memberCode   : '',    //卡号
    discount     : 0,     //折扣
    amount       : '',    //剩余金额
    preferential : 0      //优惠了多少钱
  }
  Memberprice:any = 0;    //会员价

  //商品耗卡是否禁用
  nzDisabled = {
    commodity: false, //商品
    card:      false  //服务
  }

  //扫码判断列表中有无该商品
  existCommodity = true;
  existCommodit = true;
  existCom = true;

  residualAmount:any; //卡剩余金额

  isPay:boolean = false; //防止重复提交支付

  startTime:any;
  endTime:any;

  constructor(
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef<boolean | any>,
    private modalService: NzModalService,
    private http: HttpService,
    private message: NzMessageService,
    private modal: NzModalService
  ){
  }

  ngOnInit() {

    //非会员 禁用耗卡
    if (this.consumptionInfo.haveCard == 0) {
      this.nzDisabled.card = true;
    }

    //会员 优先展示耗卡
    if (this.consumptionInfo.haveCard == 1) {
      this.nzSelectedIndex = 1;
    }

    //解决扫码回车事件闪退问题
    setTimeout(() => {
      this.searchInput.nativeElement.focus();
      this.searchInput.nativeElement.blur();
    },500)

    //监听扫码事件
    document.addEventListener('keypress', this.keypressEvent);

    /* ---------------- 设置充值卡 ---------------- */
    if (this.consumptionInfo.haveCard == 1) {
      //是会员 开放会员卡支付选项
      this.memberCard();
    } else {
      //不是会员 禁用会员卡支付选项
      this.memberInfo.isHaveCard = false;
    }
    

    /* ---------------- 耗卡start ---------------- */
    /* ---------------- 根据有无会员卡选择消费方式 ---------------- */
    this.consumptionType = this.consumptionInfo.haveCard == 1 || this.consumptionInfo.cardCode ? 0 : 1;

    this.baseFormGroup = this.fb.group({
      reserveId: [this.consumptionInfo.reserveDate ? this.consumptionInfo.id : null],
      memberId: [this.consumptionInfo.memberId || this.consumptionInfo.id],
      name: [{ value: this.consumptionInfo.name, disabled: true }],
      nick: [{ value: this.consumptionInfo.nick, disabled: true }],
      sex: [{ value: this.consumptionInfo.sex, disabled: true }],
      monthAge: [{ value: this.consumptionInfo.monthAge, disabled: true }],
      comment: []
    });
    this.timesCountGroup = this.fb.group({
      cardId: [, [Validators.required]],
      swimTeacherId: [this.consumptionInfo.swimTeacherId, [Validators.required]],
      commodityId: [, [Validators.required]],
      consumption: [, [Validators.required]],
      ringId: [],
      swimDuration: [],
      temperaturePost: [],
      weight: [],
      temperature: [],
      satisfaction: ['一般'],
      consumeDate: [{ value: null, disabled: true }],
      remarks: []
    });
    this.singleTimeGroup = this.fb.group({
      cardId: [],
      commodityId: [, [Validators.required]],
      consumption: [, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      swimTeacherId: [this.consumptionInfo.swimTeacherId, [Validators.required]],
      satisfaction: ['一般'],
      consumeDate: [{ value: null, disabled: true }],
      remarks: []
    });

    /* ------------------------- 消费服务、商品改变自动填写消费金额 ------------------------- */
    this.timesCountGroup.get('commodityId').valueChanges.subscribe(id => {
      this.http.post('/customer/price', { id, cardId: this.timesCountGroup.get('cardId').value }, false).then(res => {
        this.timesCountGroup.patchValue({ consumption: res.result.price });
      })
    });


    /* ------------------------- 消费卡改变触发消费服务列表刷新 ------------------------- */
    this.timesCountGroup.get('cardId').valueChanges.subscribe(cardId => {
      this.timesCountGroup.patchValue({ commodityId: null, consumption: null });
      this.http.post('/customer/changeCommodity', { cardId }, false).then(res => {
        this.commoditieListjc = res.result;
        this.timesCountGroup.patchValue({ commodityId: res.result[0].id });
      });
    });

    /* ------------------------- 单次消费下消费卡/商品改变触发消费服务列表刷新 ------------------------- */
    this.singleTimeGroup.get('cardId').valueChanges.subscribe(cardId => this.getCommodityPrice());
    this.singleTimeGroup.get('commodityId').valueChanges.subscribe(commodityId => this.getCommodityPrice());

    /* ------------------------- 获取服务器时间 ------------------------- */
    this.http.post('/customer/getSystemDate').then(res => {
      this.timesCountGroup.patchValue({ consumeDate: res.result });
      this.singleTimeGroup.patchValue({ consumeDate: res.result });
    });

    /* -------------------- 获取下拉列表数据 -------------------- */
    this.http.post('/member/getStoreTeachers').then(res => {
      this.teacherList = res.result;
      if (!this.consumptionInfo.reserveDate) {
        this.timesCountGroup.patchValue({ swimTeacherId: res.result[0].id });
        this.singleTimeGroup.patchValue({ swimTeacherId: res.result[0].id });
      }
    });

    /* -------------------- 如果有会员卡则去请求 会员卡列表和泳圈型号 -------------------- */
    if (this.consumptionInfo.haveCard || this.consumptionInfo.cardCode) {
      this.http.post('/memberCard/getMemberCards', { memberId: this.consumptionInfo.memberId || this.consumptionInfo.id }, false).then(res => {
        this.memberCardList = res.result;
        if (res.result.length) {
          this.timesCountGroup.patchValue({ cardId: res.result[0].id });
          this.singleTimeGroup.patchValue({ cardId: res.result[0].id });
          this.http.post('/swimRing/getStoreSwimRings').then(res => {
            this.swimRingList = res.result;
          });
        } else {
          this.consumptionType = 1;
          this.message.error('该客户会员卡(停卡，或过期，或卡次用尽)无法使用，请使用单次消费', { nzDuration: 5000 });
        }
      });
    }

    this.http.post('/commodity/getCommonCommodities').then(res => {
      this.commoditieListdc = res.result;
      /* ------------------------- 判断是否有默认商品 ------------------------- */
      res.result.map(item => item.defaulttag && this.singleTimeGroup.patchValue({ commodityId: item.id }))
    });
    /* ---------------- 耗卡end ---------------- */
  }

  ngOnDestroy(){
    document.removeEventListener('keypress',this.keypressEvent,false)
  }

  /* ---------------- 找零更改 ---------------- */
  giveChange(ev) {
    this.payment = ev;
    this.changePrice = this.keepTwoDecimalFull(this.payment - this.price);
    this.code = '';
    this.startTime = undefined;
    this.endTime = undefined;
  }

  /* ---------------- 耗卡start ---------------- */
  saveLoading: boolean;
  saveDrawer() {
    let baseValue = {};
    Object.keys(this.baseFormGroup.controls).map(key => {
      baseValue[key] = this.baseFormGroup.controls[key].value;
    })
    if (this.consumptionType === 0) {
      if (this.timesCountGroup.invalid) {
        for (let i in this.timesCountGroup.controls) {
          this.timesCountGroup.controls[i].markAsDirty();
          this.timesCountGroup.controls[i].updateValueAndValidity();
        }
      } else {
        this.saveLoading = true;
        this.http.post('/customer/create', { paramJson: JSON.stringify(Object.assign(baseValue, this.timesCountGroup.value)) }, true).then(res => {
          this.drawerRef.close(true);
          res.result.id && this.showConsumptionDetail(res.result.id);
        });
      }
    } else {
      if (this.singleTimeGroup.invalid) {
        for (let i in this.singleTimeGroup.controls) {
          this.singleTimeGroup.controls[i].markAsDirty();
          this.singleTimeGroup.controls[i].updateValueAndValidity();
        }
      } else {
        this.saveLoading = true;
        this.http.post('/customer/create', { paramJson: JSON.stringify(Object.assign(baseValue, this.singleTimeGroup.value)) }, true).then(res => {
          this.drawerRef.close(true);
          res.result.id && this.showConsumptionDetail(res.result.id);
        });
      }
    }
  }

  showConsumptionDetail(id) {
    this.http.post('/customer/viewCardDateils', { id }, false).then(res => {
      //服务打印小票参数
      this.username = res.result.name;                  //姓名
      this.cardInfo = res.result.cardInfo;              //会员卡
      this.remainTimes = (Number(res.result.remaintimes) + Number(res.result.remainFreeTimes))+'('+res.result.remaintimes+'/'+res.result.remainFreeTimes+')';   //剩余次数
      this.remainAmount = res.result.totalRemainAmount; //剩余金额
      this.serviceName = res.result.commodityName;      //商品名称
      this.expireDate = res.result.expireDate;          //过期时间
      this.consumption = res.result.consumption;        //消费金额
      this.deductionTimes = res.result.deductionTimes;  //消费次数
      if (res.code == 1000) {
        this.modal.create({
          nzTitle: '消费完成',
          nzContent: DetailComponent,
          nzComponentParams: { memberInfo: res.result },
          nzFooter: null
        })
        //服务打印小票
        this.printTest();
      }
    })
  }


  getCommodityPrice() {
    var cardId = this.singleTimeGroup.controls['cardId'].value;
    var commodityId = this.singleTimeGroup.controls['commodityId'].value;
    this.http.post('/customer/getCommodityPrice', { cardId, commodityId }, false).then(res => {
      res.code == 1000 && this.singleTimeGroup.patchValue({ consumption: res.result.price });
    })
  }
  /* ---------------- 耗卡end ---------------- */


  @DrawerClose() close: () => void;

  //保存
  // saveDrawer() {
  //   this.drawerRef.close(true);
  // }

  //搜索结果
  createTplModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    
    //查找商品不能为空
    if (!this.searchData) {
      this.message.create('warning', '商品名称不能为空');
      return;
    }

    //搜索
    this.http.post('/commodity/getCommodities', { name : this.searchData, cardId : this.consumptionInfo.id }).then(res => {
      this.searchList = res.result;
    })
    
    this.tplModal = this.modalService.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: false,
      nzClosable: false
    });
    this.code = '';
  }

  //判断是商品还是耗卡
  isSelect(id) {
    setTimeout(() => {
      this.nzSelectedIndex = id;
    },100)
  }

  //搜索后添加商品
  searchAdd(data) {

    this.existCom = true;
    for (let item of this.listOfData){
      if (data.id == item.id) {
        this.existCom = false;
      }
    }
    //添加数量和总价
    if(this.listOfData.length == 0 || this.existCom){
      this.http.post('/commodity/checkStock', {id : data.id, count : 1}).then(res => {
        if (res.code == 1000) {
          var resultData = data;
          //计算数量和总价
          resultData.num = 1;
          resultData.subtotal = resultData.num * resultData.changePrice;
          this.listOfData.push(resultData);

          //清空操作
          this.data = {};//清空
          this.numberOftotal = 0;//总数数量先清零
          this.price = 0;//应收先清零
          this.payment = 0;//实收先清零
          this.resultData = [];
          //同步listOfData和resultData的数据
          for (let item of this.listOfData) {
            this.resultData.push(item);
          }
          //遍历数据计算金额和商品数量
          for(let item of this.resultData){
            this.price += this.keepTwoDecimalFull(item.num * item.changePrice); //计算实收金额
            this.price = this.keepTwoDecimalFull(this.price);
            this.numberOftotal += this.keepTwoDecimalFull(Number(item.num));  //计算总数数量
          }

          this.payment = this.price;//实收金额默认值
          //清空
          this.code = '';
          this.startTime = undefined;
          this.endTime = undefined;
          this.memberCard();
          //tab取消禁用
          this.isSubmitShopCard = true;
          setTimeout(() => {
            this.searchInput.nativeElement.focus();
            this.searchInput.nativeElement.blur();
          },500)
        } else {
          this.message.create('warning', res.info);
          //清空
          this.code = '';
          this.startTime = undefined;
          this.endTime = undefined;
        }
      })

    } else {
      // 先遍历当前商品列表 判断是否需要进行数据合并
      for(let item of this.listOfData){
        if (data.id == item.id) {
          var num = Number(item.num) + 1;
          this.http.post('/commodity/checkStock', {id : data.id, count : num}).then(res => {
            if (res.code == 1000) {
              //计算数量和总价
              item.num = item.num + 1;
              item.subtotal = item.num * item.changePrice;
              //清空操作
              this.data = {};//清空
              this.numberOftotal = 0;//总数数量先清零
              this.price = 0;//应收先清零
              this.payment = 0;//实收先清零
              this.resultData = [];
              //同步listOfData和resultData的数据
              for (let item of this.listOfData) {
                this.resultData.push(item);
              }
              //遍历数据计算金额和商品数量
              for(let item of this.resultData){
                this.price += this.keepTwoDecimalFull(item.num * item.changePrice); //计算实收金额
                this.price = this.keepTwoDecimalFull(this.price);
                this.numberOftotal += this.keepTwoDecimalFull(Number(item.num));  //计算总数数量
              }

              this.payment = this.price;//实收金额默认值
              //清空
              this.code = '';
              this.startTime = undefined;
              this.endTime = undefined;
              this.memberCard();
              //tab取消禁用
              this.isSubmitShopCard = true;
              setTimeout(() => {
                this.searchInput.nativeElement.focus();
                this.searchInput.nativeElement.blur();
              },500)
            } else {
              this.message.create('warning', res.info);
              //清空
              this.code = '';
              this.startTime = undefined;
              this.endTime = undefined;
            }
          })
          
        }
      }
    }
    
    //关闭弹窗
    this.tplModal.destroy();
  }

  destroyTplModal() {
    this.tplModal.destroy();
  }

  /*---------------- 支付方式 ----------------*/
  selectPayType(eve) {
    this.paymentType = eve;
    this.code = '';
  }

  changeNum(id, data) {
    //0 减  1 加
    for (let item of this.listOfData) {
      if (item.id == data.id) {
        if (id == 0) {
          if (item.num == 1){this.message.create('warning','商品数量不能小于1');return;}
          //减
          item.num --;
          //同步listOfData和resultData
          this.resultData = [];
          for (let item of this.listOfData) {
            this.resultData.push(item);
          }

          //更新数量合计
          this.data = {};//清空
          this.numberOftotal = 0;//总数数量先清零
          this.price = 0;//应收先清零
          this.payment = 0;//实收先清零
          //遍历数据计算金额和商品数量
          for(let item of this.resultData){
            this.price += this.keepTwoDecimalFull(item.num * item.changePrice);
            this.price = this.keepTwoDecimalFull(this.price);
            this.numberOftotal += this.keepTwoDecimalFull(Number(item.num));    //计算总数数量
            item.subtotal = this.keepTwoDecimalFull(item.num * item.changePrice); //计算小计
          }
          
          this.payment = this.price;//实收金额默认值
          this.memberCard();
        } else if (id == 1) {
          //加
          var num = Number(item.num) + 1
          this.http.post('/commodity/checkStock', {id : item.id, count : num }).then(res => {
            if (res.code == 1000) {
              item.num = Number(item.num) + 1;

              //同步listOfData和resultData
              this.resultData = [];
              for (let item of this.listOfData) {
                this.resultData.push(item);
              }

              //更新数量合计
              this.data = {};//清空
              this.numberOftotal = 0;//总数数量先清零
              this.price = 0;//应收先清零
              this.payment = 0;//实收先清零
              //遍历数据计算金额和商品数量
              for(let item of this.resultData){
                this.price += this.keepTwoDecimalFull(item.num * item.changePrice);
                this.price = this.keepTwoDecimalFull(this.price);
                this.numberOftotal += this.keepTwoDecimalFull(Number(item.num));    //计算总数数量
                item.subtotal = this.keepTwoDecimalFull(item.num * item.changePrice); //计算小计
              }
              
              this.payment = this.price;//实收金额默认值
              this.memberCard();
            } else {
              this.message.create('warning', res.info);
              return;
            }
          })
        }
      }
    }

  }

  /*---------------- 确定结算 ----------------*/
  settlement() {

    /*---------------- 提交订单 ----------------*/
    if (!this.isPay) {
      this.isPay = true;

      //请添加商品
      if (this.resultData.length == 0) {
        this.message.create('warning', '请添加商品');
        //清空
        this.code = '';
        this.startTime = undefined;
        this.endTime = undefined;
        this.isPay = false;
        return;
      }
      //请输入实收
      if (!this.payment && this.payment != 0) {
        this.message.create('warning', '请输入实收金额');
        //清空
        this.code = '';
        this.startTime = undefined;
        this.endTime = undefined;
        this.isPay = false;
        return;
      }
      //如果实收金额少于应收金额不允许提交
      if(this.payment < this.price){
        this.message.create('warning', '实收金额不能小于应收金额');
        //清空
        this.code = '';
        this.startTime = undefined;
        this.endTime = undefined;
        this.isPay = false;
        return;
      }
      //如果储值卡金额不够
      this.http.post('/memberCard/getMemberCardInfo', {id : this.consumptionInfo.cardId}).then(res => {
        if (this.paymentType == 4){
          this.Memberprice = this.keepTwoDecimalFull(this.price*res.result.discount);//会员价格
          this.Memberprice = this.keepTwoDecimalFull(this.Memberprice);
          this.memberInfo.preferential = this.keepTwoDecimalFull(this.price-this.Memberprice);//优惠金额(优惠了多少钱)
        }
        if( this.paymentType == 4 && res.result.amount < this.Memberprice) {
          //清空
          this.code = '';
          this.startTime = undefined;
          this.endTime = undefined;
          this.isPay = false;
          this.message.create('warning', '该储值卡余额不足，请续费！');
        } else {

          this.changePrice = this.payment - this.price; //计算找零
          var paramJson = {
            payment       : this.payment,                                      //实收金额
            price         : this.price,                                        //应收金额
            changePrice   : this.changePrice,                                  //找零
            paymentType   : this.paymentType,                                  //支付方式
            memberId      : this.consumptionInfo.id,                           //会员id
            cardId        : this.consumptionInfo.cardId,                       //会员卡id
            satisfaction  : this.singleTimeGroup.get('satisfaction').value,    //满意度
            swimTeacherId : this.singleTimeGroup.get('swimTeacherId').value,   //服务泳师
            comment       : this.singleTimeGroup.get('remarks').value || null, //备注
            cardPos       : [],                                                //购物车
            reserveId     : null                                               //预约id
          }
          //购物车列表放到cardPos中
          for (let item of this.resultData) {
            var data={};
            data['id']            = item.id;          //商品id
            data['count']         = item.num;         //商品数量
            data['price']         = item.price;       //商品售价
            data['discountPrice'] = item.changePrice; //商品折扣价
            data['subtotal']      = item.subtotal;    //总价
            paramJson.cardPos.push(data);
          }
          //haveCard等于1为会员
          if(this.consumptionInfo.haveCard != 1){
            delete paramJson.cardId;
          }
          // console.log(paramJson);
          this.http.post('/customer/commodityConsumer', { paramJson : JSON.stringify(paramJson) }).then(res => {

            if (res.code == 1000) {
              this.orderNo = res.result.orderNo;
              //获取消费剩余金额
              this.preferential = res.result.preferential;//本次优惠
              this.message.create('success', '操作成功,请结算或展示付款码');

              /*---------------- 确定结算 ----------------*/
              this.http.post('/customer/payOrder', {orderNo: this.orderNo, payType: this.paymentType}).then(res => { //orderNo 订单号 payType支付方式
                if(res.code == 1000){
                  this.message.create('success', '支付成功');
                  this.isPay = false;
                  //清空
                  this.code = '';
                  this.startTime = undefined;
                  this.endTime = undefined;
                  this.isPay = false;
                  //打印
                  this.printTest();
                }else{
                  //清空
                  this.code = '';
                  this.startTime = undefined;
                  this.endTime = undefined;
                  this.isPay = false;
                  this.message.create('warning', res.info);
                }
                // console.log('支付结果', res);
              })

            } else {
              //清空
              this.code = '';
              this.startTime = undefined;
              this.endTime = undefined;
              this.isPay = false;
              this.message.create('warning', res.info);
            }

          })

        }
      })
    }

  }

  /*---------------- 删除 ----------------*/
  delete(id) {
    this.resultData = [];//清空目标数组
    for (let item of this.listOfData) {
      if (id != item.id) {
        this.resultData.push(item);
      }
    }

    this.numberOftotal = 0; //总数数量先清零
    this.price = 0;         //应收先清零
    this.changePrice = 0;   //找零金额清零
    this.payment = 0;       //实收先清零

    //将listOfData中的数据清空 和更新好的resultData同步
    this.listOfData = [];
    for (let item of this.resultData) {
      this.listOfData.push(item);
    }

    //遍历数据计算金额和商品数量
    for(let item of this.resultData){
      this.price += this.keepTwoDecimalFull(item.num * item.changePrice); //计算实收金额
      this.price = this.keepTwoDecimalFull(this.price);
      this.numberOftotal += this.keepTwoDecimalFull(Number(item.num));  //计算总数数量
    }
    this.payment = this.price;
    this.changePrice = this.payment - this.price;
  }

  /*---------------- 清空 ----------------*/
  cancel() {
    //清空
    this.code = '';
    this.startTime = undefined;
    this.endTime = undefined;
    this.isPay = false;
    this.numberOftotal = 0; //数量
    this.price = 0;         //合计
    this.resultData = [];
    this.listOfData = [];
    this.price = 0;         //实收
    this.payment = 0;       //实收
    this.changePrice = 0;   //找零
  }

  /*---------------- 重置 ----------------*/
  reset() {
    this.http.post('/member/getStoreTeachers').then(res => {
      this.singleTimeGroup.patchValue({ swimTeacherId: res.result[0].id });
      this.searchData = ''; //清空搜索框
      this.singleTimeGroup.patchValue({swimTeacherId: res.result[0].id}); //服务泳师
      this.singleTimeGroup.patchValue({satisfaction: '一般'}); //顾客满意度
      this.singleTimeGroup.patchValue({remarks: ''}); //备注
      this.isSubmitShopCard = false; //禁用选项卡
      return;
    });
  }

  /*---------------- 打印小票 ----------------*/
  printTest() {
    //设置打印参数
    this.http.post('/activity/getBasicConfig').then(res => {
      this.shopName = res.result.shopName;       //店名
      this.shopAddress = res.result.shopAddress; //地址
      this.shopTel = res.result.shopTel;         //电话
    })

    //如果是会员卡 小票展示余额
    if (this.paymentType == 4) {
      this.http.post('/memberCard/getMemberCardInfo', {id : this.consumptionInfo.cardId}).then(res => {
        if (res.code == 1000) {
          this.residualAmount = res.result.amount;
        } else {
          this.message.create('warning', res.info);
        }
      })
    }
    //获取会员电话
    var phoneNumber = this.consumptionInfo.mobilePhone.slice(0,3) + '****' + this.consumptionInfo.mobilePhone.slice(7);
    this.phoneNumber = phoneNumber; //会员电话

    //时间
    var time;
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()<10 ? '0'+(date.getMonth()+1) : ''+(date.getMonth()+1);
    var day = date.getDate()<10 ? '0'+date.getDate() : ''+date.getDate();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var second = date.getSeconds();
    time = '' + year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + second;
    this.time = time;
    //姓名
    var name = this.consumptionInfo.name;
    var nameResult;
    if (name.length == 2) {
      nameResult = '*'+name.slice(1,2);
    } else if (name.length > 2) {
      nameResult = '*'+name.slice(1,name.length-1)+'*';
    }
    this.username = nameResult;
    //支付方式
    switch(this.paymentType){
      case 1:
        this.paymentTypeText = '现金支付';
        break;
      case 2:
        this.paymentTypeText = '微信';
        break;
      case 3:
          this.paymentTypeText = '支付宝';
          break;
      case 4:
          this.paymentTypeText = '充值卡';
          break;
    }
    //增加每个商品的优惠价格
    for (let item of this.resultData) {
      item.discount =  Number(item.changePrice) - Number(item.price);
    }
    //总优惠价格
    this.generalDiscount = '0';

    //清空并重置
    this.closeDrawer();

    //打印
    setTimeout(()=>{
      var el;
      if (this.nzSelectedIndex == 0) {
        //0 商品
        el = this.el.nativeElement;
      } else if (this.nzSelectedIndex == 1) {
        //1 服务
        el = this.service.nativeElement;
      }
      
      // var el = document.getElementById('doPrint');
      var iframe = document.createElement('IFRAME');
      var doc = null;
      // iframe.setAttribute('style', 'position:absolute;width:1200px;height:100%;left:0;top:0;z-index:9999;background:#eee;');
      iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:-1500px;top:-1500px;');
      document.body.appendChild(iframe);
      doc = iframe['contentWindow'].document;
      // 引入打印的专有CSS样式，根据实际修改
      doc.write('<div>' + el.innerHTML + '</div>');
      doc.close();
      document.getElementsByTagName('iframe')[0].contentWindow.document.body.style.margin = '0';
      iframe['contentWindow'].focus();
      iframe['contentWindow'].print();
      if (navigator.userAgent.indexOf("MSIE") > 0)
      {
        document.body.removeChild(iframe);
      }
    },1000)
  }

  /*---------------- 解决JS数字精度问题 ----------------*/
  keepTwoDecimalFull (num) {
    var result = parseFloat(num);
    if (isNaN(result)) {return;}
    result = Math.round(num * 100) / 100;
    var s_x = result.toString();
    var post_decimal = s_x.indexOf('.');
    if(post_decimal < 0){
        post_decimal = s_x.length;
        s_x += '.';
    }
    while(s_x.length <= post_decimal + 2){
        s_x += '0';
    }
    return Number(s_x);
  }

  /*---------------- 关闭抽屉 ----------------*/
  closeDrawer() {
    this.drawerRef.close();
  }

  /*---------------- 会员卡 ----------------*/
  memberCard() {
    if (this.consumptionInfo.haveCard != 0) {
      //是会员 开放会员卡支付选项
      this.memberInfo.isHaveCard = true;
      this.http.post('/memberCard/getMemberCardInfo', {id : this.consumptionInfo.cardId}).then(res => {
        this.memberInfo.memberName = res.result.name;
        this.memberInfo.memberType = res.result.ctName;
        this.memberInfo.memberCode = res.result.cardCode;
        this.memberInfo.discount = Number(res.result.discount);
        this.memberInfo.amount = res.result.amount;
        this.Memberprice = this.keepTwoDecimalFull(this.price*res.result.discount);//会员价格
        this.memberInfo.preferential = this.price-this.Memberprice;//优惠金额(优惠了多少钱)
      })
    }
  }

  keypressEvent = (even) => {
      
      var ev = even.which;
      this.endTime = new Date().getTime();
      if (this.startTime == undefined) {
        this.startTime = this.endTime;
        this.code = String.fromCharCode(ev);
      } else if (ev != 13 && this.endTime - this.startTime < 1000) {
        this.code += String.fromCharCode(ev);
      } else if (ev == 13) {
        //长度为13位 是商品
        if (this.code.length == 13) {
          this.existCommodit = true;
          for (let item of this.listOfData){
            if (item.barCode == this.code) {
              this.existCommodit = false;
            }
          }
          
          //listOfData为空或者listOfData中没有此条码的时候走接口
          if(this.listOfData.length == 0 || this.existCommodit){
            this.http.post('/commodity/getCommodities', { cardId : this.consumptionInfo.id, barCode : this.code }).then(res => {
              if(res.result[0] && res.result[0].changePrice){
                var data = res.result;
                this.http.post('/commodity/checkStock', {id : res.result[0].id, count: 1}).then(res => {
                  if (res.code == 1000) {
                    for(let item of data){
                      //计算数量和总价
                      item.num = 1;
                      item.subtotal = item.num * item.changePrice;
                    }
                    this.data = data[0];
                    this.listOfData.push(this.data);
                    //清空操作
                    this.data = {};//清空
                    this.numberOftotal = 0;//总数数量先清零
                    this.price = 0;//应收先清零
                    this.payment = 0;//实收先清零
                    this.resultData = [];
                    //同步listOfData和resultData的数据
                    for (let item of this.listOfData) {
                      this.resultData.push(item);
                    }
                    //遍历数据计算金额和商品数量
                    for(let item of this.resultData){
                      this.price += this.keepTwoDecimalFull(item.num * item.changePrice); //计算实收金额
                      this.price = this.keepTwoDecimalFull(this.price);
                      this.numberOftotal += this.keepTwoDecimalFull(Number(item.num));  //计算总数数量
                    }

                    this.payment = this.price;//实收金额默认值
                    this.memberCard();
                    //tab取消禁用
                    this.isSubmitShopCard = true;
                    //清空
                    this.code = '';
                    this.startTime = undefined;
                    this.endTime = undefined;

                  } else {
                    this.message.create('warning', res.info);
                    //清空
                    this.code = '';
                    this.startTime = undefined;
                    this.endTime = undefined;
                  }
                })

              }
            })
            
          } else {

            // 先遍历当前商品列表 判断是否需要进行数据合并
            for(let item of this.listOfData){
              if (this.code == item.barCode) {

                //库存校验
                var num = Number(item.num) + 1;
                this.http.post('/commodity/checkStock', {id : item.id, count : num}).then(res => {
                  if (res.code == 1000) {
                    //计算数量和总价
                    item.num = Number(item.num) + 1;
                    item.subtotal = item.num * item.changePrice;

                    //清空操作
                    this.data = {};//清空
                    this.numberOftotal = 0;//总数数量先清零
                    this.price = 0;//应收先清零
                    this.payment = 0;//实收先清零
                    this.resultData = [];

                    //同步listOfData和resultData的数据
                    for (let item of this.listOfData) {
                      this.resultData.push(item);
                    }
                    //遍历数据计算金额和商品数量
                    for(let item of this.resultData){
                      this.price += this.keepTwoDecimalFull(item.num * item.changePrice); //计算实收金额
                      this.price = this.keepTwoDecimalFull(this.price);
                      this.numberOftotal += this.keepTwoDecimalFull(Number(item.num));  //计算总数数量
                    }

                    this.payment = this.price;//实收金额默认值
                    this.memberCard();
                    //tab取消禁用
                    this.isSubmitShopCard = true;
                    //清空
                    this.code = '';
                    this.startTime = undefined;
                    this.endTime = undefined;
                  } else {
                    this.message.create('warning', res.info);
                    //清空
                    this.code = '';
                    this.startTime = undefined;
                    this.endTime = undefined;
                  }
                })

              }
            }

          }

        } else if (this.code.length == 18) { //长度为18 是付款码
          if (!this.isPay) {
            this.isPay = true;
            //现金支付和充值卡功能扫码无效
            if (this.paymentType == 1 || this.paymentType == 4) {
              this.message.create('warning', '请点击确定结算按钮');
              this.isPay = false;
              return;
            }
            /*---------------- 提交订单 ----------------*/
            //请添加商品
            if (this.resultData.length == 0) {
              this.message.create('warning', '请添加商品');
              this.isPay = false;
              return;
            }
            //请输入实收
            if (!this.payment && this.payment != 0) {
              this.message.create('warning', '请输入实收金额');
              this.isPay = false;
              return;
            }
            //如果实收金额少于应收金额不允许提交
            if(this.payment < this.price){
              this.message.create('warning', '实收金额不能小于应收金额');
              this.isPay = false;
              return;
            }
            
            this.pay();
          }

        } else if (this.code.length > 18) {
          //长度大于18位清空code
          this.code = '';
          this.startTime = undefined;
          this.endTime = undefined;
        }

      }
  }

  pay() {
    this.changePrice = this.payment - this.price; //计算找零
    var paramJson = {
      payment       : this.payment,                                      //实收金额
      price         : this.price,                                        //应收金额
      changePrice   : this.changePrice,                                  //找零
      paymentType   : this.paymentType,                                  //支付方式
      memberId      : this.consumptionInfo.id,                           //会员id
      cardId        : this.consumptionInfo.cardId,                       //会员卡id
      satisfaction  : this.singleTimeGroup.get('satisfaction').value,    //满意度
      swimTeacherId : this.singleTimeGroup.get('swimTeacherId').value,   //服务泳师
      comment       : this.singleTimeGroup.get('remarks').value || null, //备注
      cardPos       : [],                                                //购物车
      reserveId     : null                                               //预约id
    }
    //购物车列表放到cardPos中
    for (let item of this.resultData) {
      var data={};
      data['id']            = item.id;          //商品id
      data['count']         = item.num;         //商品数量
      data['price']         = item.price;       //商品售价
      data['discountPrice'] = item.changePrice; //商品折扣价
      data['subtotal']      = item.subtotal;    //总价
      paramJson.cardPos.push(data);
    }
    //haveCard等于1为会员
    if(this.consumptionInfo.haveCard != 1){
      delete paramJson.cardId;
    }
    // console.log(paramJson);
    this.http.post('/customer/commodityConsumer', { paramJson : JSON.stringify(paramJson) }).then(res => {
      if (res.code == 1000) {
        this.orderNo = res.result.orderNo;
        //获取消费剩余金额
        this.preferential = res.result.preferential;//本次优惠
        this.message.create('success', '操作成功,请结算或展示付款码');

        /*---------------- 确定结算 ----------------*/
        this.http.post('/customer/payOrder', {
          payBarCode : this.code,        //付款码
          orderNo    : this.orderNo,     //订单号
          payType    : this.paymentType  //支付方式
        }).then(res => {
          if (res.code == 1000) {
            this.message.create('success','付款成功');
            //清空
            this.code = '';
            this.startTime = undefined;
            this.endTime = undefined;
            this.isPay = false;
            //打印
            this.printTest();
          } else {
            this.message.create('warning', res.info);
            //清空
            this.code = '';
            this.startTime = undefined;
            this.endTime = undefined;
            this.isPay = false;
          }
        })

      } else {
        this.message.create('warning', res.info);
        //清空
        this.code = '';
        this.startTime = undefined;
        this.endTime = undefined;
        this.isPay = false;
      }

    })
  }

}
