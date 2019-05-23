import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryNode } from 'src/app/ng-relax/components/query/query.component';

import { ListPageComponent } from 'src/app/ng-relax/components/list-page/list-page.component';
import { PreviewComponent } from './preview/preview.component';
import { SatisfactionComponent } from './satisfaction/satisfaction.component';
import { RevokeComponent } from './revoke/revoke.component';
import { MessageComponent } from './message/message.component';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { NzMessageService, NzDrawerService } from 'ng-zorro-antd';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less']
})
export class OrderComponent implements OnInit {

  /*-------------- 撤销一整条的提示框 --------------*/
  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  /*-------------- 撤销一条页面 --------------*/

  /* 表格参数开始 */
  listOfParentData: any[] = [];
  listOfChildrenData: any[] = [];


  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: any[] = [];
  listOfAllData: any[] = [];
  mapOfCheckedId: { [key: string]: boolean } = {};

  currentPageDataChange($event: Array<{ id: number; name: string; age: number; address: string }>): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
    console.log(this.listOfDisplayData);
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData.every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.listOfDisplayData.some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
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

  //定义的假数据
  listOfData = [
    {
      key: '1',
      commodity: [
        {
          name   : '泳儿',
          number : 1 
        },
        {
          name   : '泳裤',
          number : 1 
        },
        {
          name   : '泳衣',
          number : 2 
        }
      ],
      userName: '朱由检',
      petName: '由检',
      cardId: 17610613837,
      cardType: '金卡',
      price : 74.79,
      usedCard: 1,
      singleDeductionCard: 1,
      type: '正价',
      teacherType: '到店安排',
      isOk: '一般',
      weight: 20,
      swimmingRingType: '鱼乐脖圈',
      times: 20,
      measure: '需要', //测量
      photoGraphy: '不需要', //拍照
      remark: '消费备注', //备注
      year: '2019-05-22', //年月日
      second: '21:25:08', //时分秒
      orderId: 20190522212508 //订单号
    },
    {
      key: '2',
      commodity: [
        {
          name   : '纸尿裤',
          number : 3 
        },
        {
          name   : '没有名字的商品',
          number : 1 
        }
      ],
      userName: '方从哲',
      petName: '从哲',
      cardId: 13877161741,
      cardType: '银卡',
      price : 32.79,
      usedCard: 1,
      singleDeductionCard: 1,
      type: '正价',
      teacherType: '已预约',
      isOk: '很好',
      weight: 24,
      swimmingRingType: '超级无敌小脖圈',
      times: 17,
      measure: '需要', //测量
      photoGraphy: '需要', //拍照
      remark: '消费备注', //备注
      year: '2019-03-26', //年月日
      second: '17:06:25', //时分秒
      orderId: 20190509115509 //订单号
    },
    {
      key: '2',
      commodity: [
        {
          name   : '纸尿裤',
          number : 3 
        },
        {
          name   : '没有名字的商品',
          number : 1 
        }
      ],
      userName: '方从哲',
      petName: '从哲',
      cardId: 13877161741,
      cardType: '银卡',
      price : 32.79,
      usedCard: 1,
      singleDeductionCard: 1,
      type: '正价',
      teacherType: '已预约',
      isOk: '很好',
      weight: 24,
      swimmingRingType: '超级无敌小脖圈',
      times: 17,
      measure: '需要', //测量
      photoGraphy: '需要', //拍照
      remark: '消费备注', //备注
      year: '2019-03-26', //年月日
      second: '17:06:25', //时分秒
      orderId: 20190509115509 //订单号
    },
    {
      key: '2',
      commodity: [
        {
          name   : '纸尿裤',
          number : 3 
        },
        {
          name   : '没有名字的商品',
          number : 1 
        }
      ],
      userName: '方从哲',
      petName: '从哲',
      cardId: 13877161741,
      cardType: '银卡',
      price : 32.79,
      usedCard: 1,
      singleDeductionCard: 1,
      type: '正价',
      teacherType: '已预约',
      isOk: '很好',
      weight: 24,
      swimmingRingType: '超级无敌小脖圈',
      times: 17,
      measure: '需要', //测量
      photoGraphy: '需要', //拍照
      remark: '消费备注', //备注
      year: '2019-03-26', //年月日
      second: '17:06:25', //时分秒
      orderId: 20190509115509 //订单号
    },
    {
      key: '2',
      commodity: [
        {
          name   : '纸尿裤',
          number : 3 
        },
        {
          name   : '没有名字的商品',
          number : 1 
        }
      ],
      userName: '方从哲',
      petName: '从哲',
      cardId: 13877161741,
      cardType: '银卡',
      price : 32.79,
      usedCard: 1,
      singleDeductionCard: 1,
      type: '正价',
      teacherType: '已预约',
      isOk: '很好',
      weight: 24,
      swimmingRingType: '超级无敌小脖圈',
      times: 17,
      measure: '需要', //测量
      photoGraphy: '需要', //拍照
      remark: '消费备注', //备注
      year: '2019-03-26', //年月日
      second: '17:06:25', //时分秒
      orderId: 20190509115509 //订单号
    },
    {
      key: '2',
      commodity: [
        {
          name   : '纸尿裤',
          number : 3 
        },
        {
          name   : '没有名字的商品',
          number : 1 
        }
      ],
      userName: '方从哲',
      petName: '从哲',
      cardId: 13877161741,
      cardType: '银卡',
      price : 32.79,
      usedCard: 1,
      singleDeductionCard: 1,
      type: '正价',
      teacherType: '已预约',
      isOk: '很好',
      weight: 24,
      swimmingRingType: '超级无敌小脖圈',
      times: 17,
      measure: '需要', //测量
      photoGraphy: '需要', //拍照
      remark: '消费备注', //备注
      year: '2019-03-26', //年月日
      second: '17:06:25', //时分秒
      orderId: 20190509115509 //订单号
    },
    {
      key: '2',
      commodity: [
        {
          name   : '纸尿裤',
          number : 3 
        },
        {
          name   : '没有名字的商品',
          number : 1 
        }
      ],
      userName: '方从哲',
      petName: '从哲',
      cardId: 13877161741,
      cardType: '银卡',
      price : 32.79,
      usedCard: 1,
      singleDeductionCard: 1,
      type: '正价',
      teacherType: '已预约',
      isOk: '很好',
      weight: 24,
      swimmingRingType: '超级无敌小脖圈',
      times: 17,
      measure: '需要', //测量
      photoGraphy: '需要', //拍照
      remark: '消费备注', //备注
      year: '2019-03-26', //年月日
      second: '17:06:25', //时分秒
      orderId: 20190509115509 //订单号
    },
    {
      key: '2',
      commodity: [
        {
          name   : '纸尿裤',
          number : 3 
        },
        {
          name   : '没有名字的商品',
          number : 1 
        }
      ],
      userName: '方从哲',
      petName: '从哲',
      cardId: 13877161741,
      cardType: '银卡',
      price : 32.79,
      usedCard: 1,
      singleDeductionCard: 1,
      type: '正价',
      teacherType: '已预约',
      isOk: '很好',
      weight: 24,
      swimmingRingType: '超级无敌小脖圈',
      times: 17,
      measure: '需要', //测量
      photoGraphy: '需要', //拍照
      remark: '消费备注', //备注
      year: '2019-03-26', //年月日
      second: '17:06:25', //时分秒
      orderId: 20190509115509 //订单号
    },
    {
      key: '2',
      commodity: [
        {
          name   : '纸尿裤',
          number : 3 
        },
        {
          name   : '没有名字的商品',
          number : 1 
        }
      ],
      userName: '方从哲',
      petName: '从哲',
      cardId: 13877161741,
      cardType: '银卡',
      price : 32.79,
      usedCard: 1,
      singleDeductionCard: 1,
      type: '正价',
      teacherType: '已预约',
      isOk: '很好',
      weight: 24,
      swimmingRingType: '超级无敌小脖圈',
      times: 17,
      measure: '需要', //测量
      photoGraphy: '需要', //拍照
      remark: '消费备注', //备注
      year: '2019-03-26', //年月日
      second: '17:06:25', //时分秒
      orderId: 20190509115509 //订单号
    },
    {
      key: '2',
      commodity: [
        {
          name   : '纸尿裤',
          number : 3 
        },
        {
          name   : '没有名字的商品',
          number : 1 
        }
      ],
      userName: '方从哲',
      petName: '从哲',
      cardId: 13877161741,
      cardType: '银卡',
      price : 32.79,
      usedCard: 1,
      singleDeductionCard: 1,
      type: '正价',
      teacherType: '已预约',
      isOk: '很好',
      weight: 24,
      swimmingRingType: '超级无敌小脖圈',
      times: 17,
      measure: '需要', //测量
      photoGraphy: '需要', //拍照
      remark: '消费备注', //备注
      year: '2019-03-26', //年月日
      second: '17:06:25', //时分秒
      orderId: 20190509115509 //订单号
    },
    {
      key: '2',
      commodity: [
        {
          name   : '纸尿裤',
          number : 3 
        },
        {
          name   : '没有名字的商品',
          number : 1 
        }
      ],
      userName: '方从哲',
      petName: '从哲',
      cardId: 13877161741,
      cardType: '银卡',
      price : 32.79,
      usedCard: 1,
      singleDeductionCard: 1,
      type: '正价',
      teacherType: '已预约',
      isOk: '很好',
      weight: 24,
      swimmingRingType: '超级无敌小脖圈',
      times: 17,
      measure: '需要', //测量
      photoGraphy: '需要', //拍照
      remark: '消费备注', //备注
      year: '2019-03-26', //年月日
      second: '17:06:25', //时分秒
      orderId: 20190509115509 //订单号
    },
    {
      key: '2',
      commodity: [
        {
          name   : '纸尿裤',
          number : 3 
        },
        {
          name   : '没有名字的商品',
          number : 1 
        }
      ],
      userName: '方从哲',
      petName: '从哲',
      cardId: 13877161741,
      cardType: '银卡',
      price : 32.79,
      usedCard: 1,
      singleDeductionCard: 1,
      type: '正价',
      teacherType: '已预约',
      isOk: '很好',
      weight: 24,
      swimmingRingType: '超级无敌小脖圈',
      times: 17,
      measure: '需要', //测量
      photoGraphy: '需要', //拍照
      remark: '消费备注', //备注
      year: '2019-03-26', //年月日
      second: '17:06:25', //时分秒
      orderId: 20190509115509 //订单号
    },
    {
      key: '2',
      commodity: [
        {
          name   : '纸尿裤',
          number : 3 
        },
        {
          name   : '没有名字的商品',
          number : 1 
        }
      ],
      userName: '方从哲',
      petName: '从哲',
      cardId: 13877161741,
      cardType: '银卡',
      price : 32.79,
      usedCard: 1,
      singleDeductionCard: 1,
      type: '正价',
      teacherType: '已预约',
      isOk: '很好',
      weight: 24,
      swimmingRingType: '超级无敌小脖圈',
      times: 17,
      measure: '需要', //测量
      photoGraphy: '需要', //拍照
      remark: '消费备注', //备注
      year: '2019-03-26', //年月日
      second: '17:06:25', //时分秒
      orderId: 20190509115509 //订单号
    },
    {
      key: '2',
      commodity: [
        {
          name   : '纸尿裤',
          number : 3 
        },
        {
          name   : '没有名字的商品',
          number : 1 
        }
      ],
      userName: '方从哲',
      petName: '从哲',
      cardId: 13877161741,
      cardType: '银卡',
      price : 32.79,
      usedCard: 1,
      singleDeductionCard: 1,
      type: '正价',
      teacherType: '已预约',
      isOk: '很好',
      weight: 24,
      swimmingRingType: '超级无敌小脖圈',
      times: 17,
      measure: '需要', //测量
      photoGraphy: '需要', //拍照
      remark: '消费备注', //备注
      year: '2019-03-26', //年月日
      second: '17:06:25', //时分秒
      orderId: 20190509115509 //订单号
    },
    {
      key: '2',
      commodity: [
        {
          name   : '纸尿裤',
          number : 3 
        },
        {
          name   : '没有名字的商品',
          number : 1 
        }
      ],
      userName: '方从哲',
      petName: '从哲',
      cardId: 13877161741,
      cardType: '银卡',
      price : 32.79,
      usedCard: 1,
      singleDeductionCard: 1,
      type: '正价',
      teacherType: '已预约',
      isOk: '很好',
      weight: 24,
      swimmingRingType: '超级无敌小脖圈',
      times: 17,
      measure: '需要', //测量
      photoGraphy: '需要', //拍照
      remark: '消费备注', //备注
      year: '2019-03-26', //年月日
      second: '17:06:25', //时分秒
      orderId: 20190509115509 //订单号
    },
    {
      key: '2',
      commodity: [
        {
          name   : '纸尿裤',
          number : 3 
        },
        {
          name   : '没有名字的商品',
          number : 1 
        }
      ],
      userName: '方从哲',
      petName: '从哲',
      cardId: 13877161741,
      cardType: '银卡',
      price : 32.79,
      usedCard: 1,
      singleDeductionCard: 1,
      type: '正价',
      teacherType: '已预约',
      isOk: '很好',
      weight: 24,
      swimmingRingType: '超级无敌小脖圈',
      times: 17,
      measure: '需要', //测量
      photoGraphy: '需要', //拍照
      remark: '消费备注', //备注
      year: '2019-03-26', //年月日
      second: '17:06:25', //时分秒
      orderId: 20190509115509 //订单号
    }
  ];

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

  checkedItems: any[] = [];

  constructor(
    private message: NzMessageService,
    private drawer: NzDrawerService
  ) { }

  ngOnInit() {

    /*-------------- 重组数据格式 --------------*/
    for (let i=0; i<this.listOfData.length; i++) {
      var f = 0;
      for (let j=0; j<this.listOfData[i].commodity.length; j++) {
        var item = {
          commodity : [
            {
              "name"                : '',
              "number"              : 0,
              "key"                 : this.listOfData[i].key,
              "userName"            : this.listOfData[i].userName,
              "petName"             : this.listOfData[i].petName,
              "cardId"              : this.listOfData[i].cardId,
              "cardType"            : this.listOfData[i].cardType,
              "price"               : this.listOfData[i].price,
              "usedCard"            : this.listOfData[i].usedCard,
              "singleDeductionCard" : this.listOfData[i].singleDeductionCard,
              "type"                : this.listOfData[i].type,
              "teacherType"         : this.listOfData[i].teacherType,
              "isOk"                : this.listOfData[i].isOk,
              "weight"              : this.listOfData[i].weight,
              "swimmingRingType"    : this.listOfData[i].swimmingRingType,
              "times"               : this.listOfData[i].times,
              "measure"             : this.listOfData[i].measure,
              "photoGraphy"         : this.listOfData[i].photoGraphy,
              "remark"              : this.listOfData[i].remark,
              "year"                : this.listOfData[i].year,
              "second"              : this.listOfData[i].second, 
              "orderId"             : this.listOfData[i].orderId,
              "rowspan"             : 0
            }
          ]
        }
        if(this.listOfData[i].cardId == item.commodity[0].cardId){
          f++;
          if(f >= 2){
            var data = {
              "name"    : this.listOfData[i].commodity[j].name,
              "number"  : this.listOfData[i].commodity[j].number,
              "rowspan" : this.listOfData[i].commodity.length
            }
            this.result[i].commodity.push(data);
          }else{
            item.commodity[0].name    = this.listOfData[i].commodity[j].name;
            item.commodity[0].number  = this.listOfData[i].commodity[j].number;
            item.commodity[0].rowspan = this.listOfData[i].commodity.length;
            this.result.push(item);
          }
        }
      }
    }

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

  }

  /*-------------- 查看、撤销、修改满意度等按钮 --------------*/
  operation(type) {
    if (!this.checkedItems.length) {
      this.message.warning('请选择一条数据进行操作');
    } else {
      let recordInfo = this.listPage.eaTable.dataSet.filter(res => res.id === this.checkedItems[0])[0];
      const drawer = this.drawer.create({
        nzTitle: this.operationComponents[type].title,
        nzWidth: 720,
        nzContent: this.operationComponents[type].component,
        nzContentParams: { id: recordInfo.id, recordInfo }
      });
      drawer.afterClose.subscribe(res => res && this.listPage.eaTable._request());
    }
  }

}
