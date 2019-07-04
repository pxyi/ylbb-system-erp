import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryNode, QueryComponent } from 'src/app/ng-relax/components/query/query.component';

import { ListPageComponent } from 'src/app/ng-relax/components/list-page/list-page.component';
import { PreviewComponent } from './preview/preview.component';
import { SatisfactionComponent } from './satisfaction/satisfaction.component';
import { RevokeComponent } from './revoke/revoke.component';
import { MessageComponent } from './message/message.component';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { NzMessageService, NzDrawerService } from 'ng-zorro-antd';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { serialize } from 'src/app/core/http.intercept';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less']
})
export class OrderComponent implements OnInit {

  @ViewChild('tlModal') tlModal;

  @ViewChild('eaQuery') eaQuery: QueryComponent;

  /*-------------- 撤销一整条的提示框 --------------*/
  isVisible = false;
  basicTable = [];//撤销一整条展示数据

  handleOk(): void {
    if (this.formGroup.invalid) {
      for (let i in this.formGroup.controls) {
        this.formGroup.controls[i].markAsDirty();
        this.formGroup.controls[i].updateValueAndValidity();
      }
    } else {
      //订单撤销
      this.http.post('/consumeOrder/cancel', { orderNo: this.basicTable[0].orderNo, causesRevocation: this.formGroup.get('causesRevocation').value }).then(res => {
        this.isVisible = false;
        this.tlModal.nzAfterClose.subscribe(res => this._request());
      })
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  formGroup:FormGroup;//撤销订单

  /*-------------- 撤销一条页面 --------------*/

  /* 表格参数开始 */
  listOfParentData: any[] = [];
  listOfChildrenData: any[] = [];

  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: any[] = [];
  listOfAllData: any[] = [];
  mapOfCheckedId: { [key: string]: boolean } = {};
  backups:any = {};//用来备份
  selectArray:any = [];//控制单选

  loading = true;  //表格加载

  //页码
  nzPageIndex = 1; //当前页数
  nzTotal = 50;    //总条数
  nzPageSize = 10; //每页条数

  currentPageDataChange($event: Array<{ id: number; name: string; age: number; address: string }>): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  resetMapOfCheckedId() {
    // this.mapOfCheckedId = {1: true};
  }

  refreshStatus(eve?): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData.every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.listOfDisplayData.some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
    //单选
    if(eve){
      for (let item of this.listOfData) {
        item.isChecked = false;
        if(eve == item.orderNo){
          if(this.checkedItems[0] == eve){
            item.isChecked = false
            this.checkedItems = [];
          }else{
            item.isChecked = true
            this.checkedItems[0] = item.orderNo;
          }
        }
      }
    }
  }

  checkAll(value: boolean): void {
    this.listOfDisplayData.forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }

  /* 表格参数结束 */

  @ViewChild('listPage') listPage: ListPageComponent;

  queryNode:QueryNode[] = [
    {
      label       : '会员卡号',
      key         : 'cardCode',
      type        : 'input'
    },
    {
      label       : '会员姓名',
      key         : 'memberName',
      type        : 'input'
    },
    {
      label       : '会员ID',
      key         : 'memberId',
      type        : 'input'
    },
    {
      label       : '会员小名',
      key         : 'nick',
      type        : 'input',
      isHide      : true
    },
    {
      label       : '服务泳师',
      key         : 'teacherId',
      type        : 'select',
      optionsUrl  : '/member/getStoreTeachers'
    },
    {
      label       : '婴儿类型',
      key         : 'babyType',
      type        : 'select',
      options     : [ { name: '婴儿', id: '婴儿' }, { name: '幼儿', id: '幼儿' } ],
      isHide      : true
    },
    {
      label       : '消费商品',
      key         : 'commodityId',
      type        : 'select',
      optionsUrl  : '/commodity/getStoreCommodities',
      isHide      : true 
    },
    {
      label       : '业务类型',
      key         : 'categoryId',
      type        : 'select',
      optionsUrl  : '/cardBusinessManagement/getStoreCardTypeCategores',
      isHide      : true
    },
    {
      label       : '卡类型',
      key         : 'cardTypeId',
      type        : 'select',
      optionsUrl  : '/cardTypeManagement/findList',
      isHide      : true
    },
    {
      label       : '满意度',
      key         : 'satisfaction',
      type        : 'select',
      options     : [ { name: '满意', id: '满意' }, { name: '表扬', id: '表扬' }, { name: '一般', id: '一般' }, { name: '不好', id: '不好' } ],
      isHide      : true
    },
    {
      label       : '消费日期',
      key         : 'date',
      valueKey    : ['startDate', 'endDate'],
      type        : 'rangepicker'
    }
  ]

  //订单列表数据
  listOfData:any = [];

  result = [] //整理出来循环的数据格式

  operationComponents = {
    preview: {
      title: '查看消费记录',
      component: PreviewComponent
    },
    satisfaction: {
      title: '修改满意度',
      component: SatisfactionComponent
    },
    revoke: {
      title: '撤销消费',
      component: RevokeComponent
    },
    message: {
      title: '发短信',
      component: MessageComponent
    },
    curriculum: {
      title: '添加课程',
      component: CurriculumComponent
    }
  };

  inputValue:any;//撤销原因备注

  checkedItems: any[] = [];

  _pageInfo = {
    loading: false,
    pageSize: 10,
    pageNo: 1,
    totalPage: 0
  };

  constructor(
    private message: NzMessageService,
    private drawer: NzDrawerService,
    private http: HttpService,
    private fb: FormBuilder,
    private httpSubscribe: HttpClient
  ) { }

  ngOnInit() {

    /*-------------- 初始化列表数据 --------------*/
    //更改数据
    this.http.post('/consumeOrder/list').then(res => {
      this.listOfData = res.result.list;     //数据
      this.nzPageIndex = res.result.pageNum; //第几页
      this.nzPageSize = res.result.pageSize; //每页展示多少
      this.nzTotal = res.result.totalPage;   //数据总条数
      for(let item of this.listOfData){
        item.isShow = false;
      }
      this.loading = false;
    })

    /* 表格测试数据开始 */
    for (let i = 0; i < 3; ++i) {
      this.listOfParentData.push({
        key: i,
        name: 'Screem',
        platform: 'iOS',
        version: '10.3.4.5654',
        upgradeNum: 500,
        creator: 'Jack',
        createdAt: '2014-12-24 23:12:00',
        expand: false
      });
    }
    for (let i = 0; i < 3; ++i) {
      this.listOfChildrenData.push({
        key: i,
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: 'Upgraded: 56'
      });
    }



    for (let i = 0; i < 10; i++) {
      this.listOfAllData.push({
        id: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`
      });
    }
    /* 表格测试数据结束 */

    this.formGroup = this.fb.group({
      causesRevocation : [, [Validators.required]]
    })

  }

  /*-------------- 单条撤销 --------------*/
  revokeOne(data,id) {
    //只有状态为正常时点击生效
    for(let item of data.consumeRecordVOS){
      if(item.id == id){
        if(item.status == 0){
          let recordInfo = data;
          recordInfo.id = id;
          const drawer = this.drawer.create({
            nzTitle: '撤销消费',
            nzWidth: 720,
            nzContent: RevokeComponent,
            nzContentParams: { id: id, recordInfo:data }
          });
          drawer.afterClose.subscribe(res => res && this._request())
        }
      }
    }
  }

  /*-------------- 查看、撤销、修改满意度等按钮 --------------*/
  operation(type) {
    if (!this.checkedItems.length) {
      this.message.warning('请选择一条数据进行操作');
    } else if(type == 'revoke') {
      //遍历查询该条
      this.basicTable = [];
      this.isVisible = true;
      for(let item of this.listOfData){
        if(item.orderNo == this.checkedItems[0]){
          this.basicTable.push(item);
        }
      }
    } else {
      let recordInfo = this.listOfData.filter(res => res.orderNo == this.checkedItems[0])[0];
      // let recordInfo = this.listPage.eaTable.dataSet.filter(res => res.id === this.checkedItems[0])[0];
      const drawer = this.drawer.create({
        nzTitle: this.operationComponents[type].title,
        nzWidth: 720,
        nzContent: this.operationComponents[type].component,
        nzContentParams: { id: recordInfo.id, recordInfo }
      });
      drawer.afterClose.subscribe(res => res && this.listPage.eaTable._request());
    }
  }

  /*---------------- 异步刷新数据 ----------------*/
  _request() {
    this.httpSubscribe.post<any>('/consumeOrder/list', {}, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    }).subscribe(res => {
      // console.log(res);
      var temp = res.result.list;
      for(let item of temp){
        item.isChecked = false;
      }
      this.listOfData = temp;
      // console.log('subscribe---listOfData', this.listOfData);
    });
  }

  /*---------------- 页码改变的回调 ----------------*/
  nzPageIndexChange(event) {
    //更改数据
    this.loading = true;
    this.http.post('/consumeOrder/list', {pageNum: event, pageSize: this.nzPageSize}).then(res => {
      this.listOfData = res.result.list;     //数据
      this.nzPageIndex = res.result.pageNum; //第几页
      this.nzPageSize = res.result.pageSize; //每页展示多少
      this.nzTotal = res.result.totalPage;   //数据总条数
      this.loading = false;
    })
  }

  /*---------------- 每页条数改变的回调 ----------------*/
  nzPageSizeChange(event) {
    //更改数据
    this.loading = true;
    this.http.post('/consumeOrder/list', {pageNum: this.nzPageIndex, pageSize: event}).then(res => {
      this.listOfData = res.result.list;     //数据
      this.nzPageIndex = res.result.pageNum; //第几页
      this.nzPageSize = res.result.pageSize; //每页展示多少
      this.nzTotal = res.result.totalPage;   //数据总条数
      this.loading = false;
    })
  }

  /*---------------- 展开页面 ----------------*/
  showCommodity(data) {
    for (let item of this.listOfData) {
      if (item.orderNo == data.orderNo) {
        //根据订单号查询商品
        this.http.post('/consumeOrder/getConsumeListByOrderNo', {orderNo : data.orderNo}).then(res => {
          if (res.code == 1000) {
            item.isShow = !item.isShow;
            item.consumeRecordVOS = res.result;
          } else {
            this.message.create('warning', res.info);
          }
        })
      }
    }
  }

  queryParams = {};
  query(e) {
    this.queryParams = e;
    this._pageInfo.pageNo = 1;
    this.request();
  }

  request() {
    var params = {
      paramJson: JSON.stringify(this.queryParams)
    }
    this.httpSubscribe.post<any>('/consumeOrder/list', serialize(params), {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    }).subscribe(res => {
      var temp = res.result.list;
      for(let item of temp){
        item.isChecked = false;
      }
      this.listOfData = temp;
    });
  }

}
