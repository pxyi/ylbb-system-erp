import { Component, OnInit, Input, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { NzModalRef, NzDrawerRef, NzModalService, NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consumption-tab',
  templateUrl: './consumption-tab.component.html',
  styleUrls: ['./consumption-tab.component.less']
})
export class ConsumptionTabComponent implements OnInit {

  @Input() consumptionInfo;

  timesCountGroup: FormGroup;

  singleTimeGroup: FormGroup;

  tplModal: NzModalRef;
  htmlModalVisible = false;
  disabled = false;
  switchValue = false;
  //tab标签
  position = 'left';
  //商品表格数据
  listOfData:any = [];
  //服务泳师
  teacherData:any = [];
  //备注
  inputValue:string;
  //搜索框value
  searchData:string;
  //每次扫码的数字
  code:any = "";
  //扫码临时存储数据
  data:any = {};
  resultData:any = [];//处理后的数据数组
  //支付方式
  paymentType:number = 1; //1现金支付 2微信 3支付宝 4充值卡
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
  //这次消费金额
  thisPrice:any = 0;
  //剩余金额
  remainPrice:any = 0;
  //本次优惠
  preferential:any = 0;
  //是否合并
  isMerge = true;
  //付款码
  payCode:any = '';
  //订单是否提交(提交之后再扫就是付款码)
  // orderIsSubmit:boolean = false;

  constructor(
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef<boolean | any>,
    private modalService: NzModalService,
    private http: HttpService,
    private routeInfo: ActivatedRoute,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    //监听扫码事件
    var startTime,endTime;
    document.addEventListener('keypress', (even)=>{
      var ev = even.which;
      endTime = new Date().getTime();
      if (startTime == undefined) {
        startTime = endTime;
        this.code = String.fromCharCode(ev);
      } else if (ev != 13 && endTime - startTime < 1000) {
        this.code += String.fromCharCode(ev);
      } else if (ev == 13) {
        //订单没有提交 扫码的是商品
        // if (!this.orderIsSubmit) {
          // 先遍历当前商品列表 判断是否需要进行数据合并
          this.isMerge = true;//默认将状态更改为true
          console.log(this.listOfData);
          for(let item of this.listOfData){
            if (this.code == item.barCode) {
              //计算数量和总价
              item.num = parseInt(item.num) + 1;
              item.subtotal = item.num * item.changePrice;

              //清空操作
              this.data = {};//清空
              this.numberOftotal = 0;//总数数量先清零
              this.price = 0;//应收先清零
              this.resultData = [];
              //同步listOfData和resultData的数据
              for (let item of this.listOfData) {
                this.resultData.push(item);
              }
              //遍历数据计算金额和商品数量
              for(let item of this.resultData){
                this.price += item.num * item.changePrice; //计算实收金额
                this.numberOftotal += parseInt(item.num);  //计算总数数量
              }
              //tab取消禁用
              this.isSubmitShopCard = true;
              this.isMerge = false;//将状态更改为不可合并
              console.log('合并', this.listOfData);
            }
          }

          //listOfData为空或者listOfData中没有此条码的时候走接口
          if(this.listOfData.length == 0 || this.isMerge){
            this.http.post('/commodity/getCommodities', { cardId : this.consumptionInfo.id, barCode : this.code }).then(res => {
              if(res.result[0].changePrice){
                for(let item of res.result){
                  //计算数量和总价
                  item.num = 1;
                  item.subtotal = item.num * item.changePrice;
                }
                this.data = res.result[0];
                this.data.barCode = this.code;
                this.listOfData.push(this.data);
                //清空操作
                this.data = {};//清空
                this.numberOftotal = 0;//总数数量先清零
                this.price = 0;//应收先清零
                this.resultData = [];
                //同步listOfData和resultData的数据
                for (let item of this.listOfData) {
                  this.resultData.push(item);
                }
                //遍历数据计算金额和商品数量
                for(let item of this.resultData){
                  this.price += item.num * item.changePrice; //计算实收金额
                  this.numberOftotal += parseInt(item.num);  //计算总数数量
                }
                //tab取消禁用
                this.isSubmitShopCard = true;
                this.isMerge = false;//将状态更改为不可合并
                console.log('未合并', this.listOfData);
              }
            })
            
          }

        // } else {
        //   //订单已经提交 扫描付款码
        //   alert('付款啦付款啦 ~ ~ ~ ');
        //   this.orderIsSubmit = false;
        // }

        //清空条码
        setTimeout(()=>{
          this.code = '';
          startTime = undefined;
          endTime = undefined;
        },1000)

      }
    })

    /*---------------- 获取老师列表 ----------------*/
    this.http.post('/member/getStoreTeachers').then(res => {
      this.teacherData = res.result;
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
      swimTeacherId: [16035],  //服务泳师
      satisfaction: ['一般'],  //顾客满意程度
      remarks: ['123']         //备注
    })
    
  }

  @DrawerClose() close: () => void;

  //保存
  saveDrawer() {
    this.drawerRef.close(true);
  }

  //搜索结果
  createTplModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    //点击搜索按钮
    this.http.post('/commodity/getCommodities', { name : this.searchData, cardId : this.consumptionInfo.id }).then(res => {
      console.log(res);
    })
    this.tplModal = this.modalService.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: false,
      nzClosable: false,
      nzOnOk: () => console.log('Click ok')
    });
  }

  destroyTplModal() {
    this.tplModal.destroy();
  }

  /*---------------- 支付方式 ----------------*/
  selectPayType(eve) {
    this.paymentType = eve;
  }

  /*---------------- 提交订单 ----------------*/
  placeOrder() {
    if (this.resultData.length == 0) {
      this.message.create('warning', '请添加商品');
      return;
    }
    //请输入实收
    if (!this.payment) {
      this.message.create('warning', '请输入实收金额');
      return;
    }
    
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
      cardPos       : []                                                 //购物车
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
    if(this.consumptionInfo.haveCard == 1){
      delete paramJson.cardId;
    }
    console.log(paramJson);
    this.http.post('/customer/commodityConsumer', { paramJson : JSON.stringify(paramJson) }).then(res => {
      console.log(res);
      if (res.code == 1000) {
        this.orderNo = res.result.orderNo;
        //获取消费剩余金额
        this.thisPrice = res.result.thisPrice;//这次消费
        this.remainPrice = res.result.remainPrice;//剩余金额
        this.preferential = res.result.preferential;//本次优惠
        // this.orderIsSubmit = true;
      } else {
        this.message.create('warning', res.info);
      }
    })
  }

  /*---------------- 确定结算 ----------------*/
  settlement() {
    //正整数小数点后两位
    // var reg = /^[1-9]\d*(\.[0-9]{1,2})?$/;
    // if(!reg.test(this.price)){
    //   this.message.create('warning', '请输入正确的应收价');
    //   return;
    // }
    //如果实收金额少于应收金额不允许提交
    if(this.payment < this.price){
      this.message.create('warning', '实收金额不能小于应收金额');
      return;
    }
    //判断是否提交订单
    if(!this.isSubmitShopCard || !this.orderNo){
      this.message.create('warning', '请提交订单');
      return;
    }
    //判断两个数据是否同步 如果不同步提示请提交订单
    //结算
    this.http.post('/customer/payOrder', {orderNo: this.orderNo, payType: this.paymentType}).then(res => { //orderNo 订单号 payType支付方式
      if(res.code == 1000){
        this.message.create('success', '支付成功');
      }else{
        this.message.create('warning', res.info);
      }
      console.log('支付结果', res);
    })
  }

  /*---------------- 删除 ----------------*/
  delete(id) {
    this.resultData = [];//清空目标数组
    for (let item of this.listOfData) {
      if (id == !item.id) {
        this.resultData.push(item);
      }
    }
  }

  /*---------------- 清空 ----------------*/
  cancel() {
    this.listOfData = [];
    this.resultData = [];
    this.numberOftotal = 0; //总数数量先清零
    this.price = 0;         //应收先清零
    this.changePrice = 0;   //找零金额清零
  }

  /*---------------- 确认支付 ----------------*/
  paymentSubmit() {
    //判断是否提交订单
    if(!this.isSubmitShopCard || !this.orderNo){
      this.message.create('warning', '请提交订单');
      return;
    }
    this.http.post('/customer/payOrder', {
      payBarCode : this.payCode,     //付款码
      orderNo    : this.orderNo,     //订单号
      payType    : this.paymentType  //支付方式
    }).then(res => {
      console.log(res);
    })
  }

}
