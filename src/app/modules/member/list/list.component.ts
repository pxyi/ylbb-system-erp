import { AdjustingComponent } from './adjusting/adjusting.component';
import { Router,ActivatedRoute } from '@angular/router';
import { SupplementComponent } from './supplement/supplement.component';
import { StopComponent } from './stop/stop.component';
import { ListPageComponent } from './../../../ng-relax/components/list-page/list-page.component';
import { ContinuedComponent } from './continued/continued.component';
import { ChangeComponent } from './change/change.component';
import { UpdateComponent } from './update/update.component';
import { ConsumptionComponent } from '../../public/consumption/consumption.component';

import { AdjustmentComponent } from './adjustment/adjustment.component';
import { QueryNode } from './../../../ng-relax/components/query/query.component';
import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { NzMessageService, NzDrawerService } from 'ng-zorro-antd';
import { OpenComponent } from './open/open.component';
import { NumberComponent } from './number/number.component';
import { AppointComponent } from './appoint/appoint.component';
import { ConsumptionsComponent } from './consumption/consumption.component';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { WithdrawComponent } from './withdraw/withdraw.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  datalabelList:any = [];
  passArranging:any = false;
  ItemsMemberId:any = "";
  showAdjust: boolean = false;
  memberdetailTk: any = '';
  radioValue: any = [];
  isrepeat: any = false;
  SyllabusAllList: any = [];  
  RecordList:any = [];
  RecordList1: any = [];
  RecordList2: any = [];
  RecordList3: any = [];
  RecordList4: any = [];
  RecordList5: any = [];
  RecordList6: any = [];
  RecordList7: any = []; 
  radioName: any = [];
  dateList:any = [];
  memberData:any = {};
  memberIds :number;
  listArr: any[] = [];
  selectData:any;
  kcName:any[] = [];
  startDate: any = '';
  Tuesday: any = '';
  Wednesday: any = '';
  Thursday: any = '';
  Friday: any = '';
  Saturday: any = '';
  endDate: any = '';
  dateIndex: number;
  isBtnDisVled: boolean = true;
  nowstartDate: any;
  nowendDate: any;
  isLoading:boolean = false;
  successOpen: boolean;
  reserveList: any[] = [];
  copywriting: string;
  operationComponents = {
    adjustment: {
      title: '通卡调整',
      component: AdjustmentComponent
    },
    change: {
      title: '卡项变更',
      component: ChangeComponent
    },
    update: {
      title: '升级技能课',
      component: UpdateComponent
    },
    continued: {
      title: '续卡',
      component: ContinuedComponent
    },
    appoint: {
      title     : '预约',
      component : AppointComponent,
      userInfo  : true
    },
    consumption: {
      title     : '消费',
      component : ConsumptionsComponent,
      userInfo  : true
    },
    consumptionerp: { 
      title     : '消费',
      component : ConsumptionComponent,
      userInfo  : true
    },
    stop: {
      title: '停卡',
      component: StopComponent
    },
    open: {
      title: '重开卡',
      component: OpenComponent
    },
    supplement: {
      title: '补卡',
      component: SupplementComponent
    },
    number: {
      title: '换卡号',
      component: NumberComponent
    },
    withdraw: {
      title: '退卡',
      component: WithdrawComponent
    }
  }

  queryNode: QueryNode[] = [
    {
      label       : '卡号',
      key         : 'cardCode',
      type        : 'input'
    },
    {
      label       : '会员ID',
      key         : 'memberId',
      type        : 'input'
    }, 
    {
      label       : '会员姓名',
      key         : 'memberName',
      type        : 'input'
    }, 
    {
      label       : '卡类型',
      key         : 'cardTypeId',
      type        : 'select',
      optionsUrl  : '/yeqs/cardTypeManagement/findList'
    },
    {
      label       : '卡状态',
      key         : 'status',
      type        : 'select',
      options     : [ { name: '正常', id: '0' }, { name: '停卡', id: '1' }, { name: '过期', id: '2' } ]
    },
    {
      label       : '婴儿类型',
      key         : 'babyType',
      type        : 'select',
      options     : [{ name: '婴儿', id: '婴儿' }, { name: '幼儿', id: '幼儿' }],
      isHide      : true
    },
    {
      label       : '剩余卡次',
      key         : 'remainTimes',
      type        : 'between',
      valueKey    : ['startCardTimes', 'endCardTimes'],
      isHide      : true
    },
    {
      label       : '所属社区',
      key         : 'communityName',
      type        : 'input',
      isHide      : true
    }, 
  ]
  
  paramsDefault = {};
  checkedItems: any[] = [];

  showDrawer: boolean;
  drawerTitle: string;

  constructor(
    private router: Router,
    private http: HttpService,
    private message: NzMessageService,
    private resolver: ComponentFactoryResolver,
    private activatedRoute: ActivatedRoute,
    private drawer: NzDrawerService
  ) { 
    this.nowDate();
    // this.activatedRoute.queryParamMap.subscribe((res: any) => {
    //   if (res.params.type) {
    //     this.type = res.params.type;
    //     this.paramsInit.cardCode = res.params.code;
    //     setTimeout(() => {
    //       this.listPage.eaQuery._queryForm.patchValue({ cardCode: res.params.code })
    //     });
    //   } else if (res.params.memberId) {
    //     this.paramsInit = { memberId: res.params.memberId };
    //     setTimeout(() => {
    //       this.listPage.eaQuery._queryForm.patchValue({ memberId: res.params.memberId });
    //     });
    //   }
    // });
    this.activatedRoute.queryParamMap.subscribe((res: any) => { 
      if (res.params.memberId) {
        this.type = res.params.type;
        this.paramsInit.memberId = res.params.memberId;
        setTimeout(() => {
          this.listPage.eaQuery._queryForm.patchValue({ memberId: res.params.memberId })
          this.listPage.eaQuery._submit();
        });
      }
    });
    this.http.post('/yeqs/intelligent/selectScour', {}, false).then(res => {
        this.dateList = res.result.list;
    });
  }

  ngOnInit() {
  }

  type: string;
  cardCode: number;
  paramsInit: any = {};
  dataChange(dataset) {
    if (this.type) {
      this.checkedItems.push(dataset[0].id);
      this.memberData = dataset[0];
      
      dataset[0].checked = true;
      this.operation(this.type);
    }
  } 
  operation(type) {
    if (!this.checkedItems.length) {
      this.message.warning('请选择一条数据进行操作');
    } else if (type === 'stop') {
      this.listPage.eaTable.dataSet.map(res => {
        if (res.id == this.checkedItems[0]) {
          if (res.turnCard) {
            this.message.warning('该卡有停卡限制,不能停卡！');
          } else {
            this.openDrawer(this.operationComponents[type]);
          }
        }
      })
    } else if (type === 'open') {
      this.listPage.eaTable.dataSet.map(res => {
        if (res.id == this.checkedItems[0]) {
          if (res.runningState == '停卡') {
            this.openDrawer(this.operationComponents[type]);
          } else {
            this.message.warning('该卡不能重开卡！');
          }
        }
      })
    } else if (type === 'supplement') {
      this.listPage.eaTable.dataSet.map(res => {
        if (res.id == this.checkedItems[0]) {
          if (res.serialNumber) {
            this.openDrawer(this.operationComponents[type]);
          } else {
            this.message.warning('该卡是电子卡片,请点击换卡号！');
          }
        }
      })
    } else if (type === 'withdraw') {
      this.listPage.eaTable.dataSet.map(res => {
        if (res.id == this.checkedItems[0]) {
          if(res.skillsStatus != 1){
            this.message.warning('非技能课会员，不可操作！');
          }else{
            if (res.runningState != '退卡') {
              this.openDrawer(this.operationComponents[type]);
            } else {
              this.message.warning('该卡已退卡！');
            }
          }
        }
      })
    } else if (type === 'update') {
      this.listPage.eaTable.dataSet.map(res => {
        if (res.id == this.checkedItems[0]) {
            if(res.skillsStatus == 1){
              this.message.warning('技能课卡不能再次升级！');
            }else{
              this.openDrawer(this.operationComponents[type]);
            }
        }
      })
    } else if (type === 'appoint') {
      this.listPage.eaTable.dataSet.map(res => {
        if (res.id == this.checkedItems[0]) {
            if(res.skillsStatus == 1){
              this.message.warning('技能课会员不支持预约！');
            }else{
              this.openDrawer(this.operationComponents[type]);
            }
        }
      })
    } else if (type === 'consumption') {
      this.listPage.eaTable.dataSet.map(res => {
        if (res.id == this.checkedItems[0]) {
            if(res.skillsStatus != 1){
              this.openDrawer(this.operationComponents['consumptionerp']);
            }else{
              this.openDrawer(this.operationComponents[type]);  
            }
        }
      })
    }else if (this.operationComponents[type]) {
      this.openDrawer(this.operationComponents[type]);
    }
  }
  @ViewChild('listPage') listPage: ListPageComponent;
  // 排课
  arranging() {
    this.nowDate();
    if (!this.checkedItems.length) {
      this.message.warning('请选择一条数据进行操作');
    } else {
      this.listPage.eaTable.dataSet.map(res => {
        if (res.id == this.checkedItems[0]) {
          if (res.skillsStatus != 1) {
            this.message.warning('只有技能课卡会员才能排课！');
          } else {
          this.selectSyllabusAll();
          this.RecordList = [];
          this.RecordList1 = [];
          this.RecordList2 = [];
          this.RecordList3 = [];
          this.RecordList4 = [];
          this.RecordList5 = [];
          this.RecordList6 = [];
          this.RecordList7 = [];      
          this.radioValue = [];
          this.RecordList = [];
          this.datalabelList = [];
          this.kcName = [];
          this.listArr = [];
          this.showAdjust = true;
          this.http.post('/yeqs/curriculum/selectMsg', { memberId: res.memberId }, false).then(res => {
            if (res.code == 1000) {
              this.memberdetailTk = res.result.list;
            } else {
              this.message.create('error', res.info);
            }
          });
          this.memberData = res;
         }
        }
      })
     
      }
  }
  


  openDrawer(options) {
    let dataSet = JSON.parse(JSON.stringify(this.listPage.eaTable.dataSet));
    let memberCardInfo = dataSet.filter(res => res.id == this.checkedItems[0])[0];
    const drawer = this.drawer.create({
      nzWidth: 720,
      nzTitle: options.title,
      nzContent: options.component,
      nzContentParams: options.params || { id: this.checkedItems[0], memberCardInfo }
    });
    drawer.afterClose.subscribe(res => res && this.listPage.eaTable._request());
  }

  /****************办卡选课******************* */

  closeAdjust() {
    //this.message.create('error', '如果关闭弹窗，将不能继续排课！');
    this.showAdjust = false;
    this.isrepeat = false;
    this.showAdjust = false;
    this.listArr = [];
    this.kcName = [];
  }
  isAdjust() {
    if(!this.listArr.length){
      this.message.create('error', '请至少选择一个课程');
      return false;
    }

    let cardNum = 0;
    let list = [];
    let sbs = false;
    
    this.kcName.map(item=>{
      if(!item.arranging||!(item.arranging>0)){
        sbs = true;    
      }else{
        cardNum += item.arranging;
        item.reserveList=[];
        list.push(item);
      }
    })
    if(sbs){
      this.message.create('error', '请输入正确的排课次数');
      return false;
    }
    if( cardNum > this.memberdetailTk.cardNumber ){
      this.message.create('error', '剩余卡次不足');
      return false; 
    }
    list.map(item=>{
      this.listArr.map(data=>{
        if(item.name == data.name){
            item.reserveList.push(data);
        }
      })
    })
    this.isLoading = true;
    let paramJson: any = JSON.stringify({
      babyNumber: this.memberdetailTk.babyNumber,
      name: this.memberdetailTk.name,
      parentName: this.memberdetailTk.parentName,
      cardCode: this.memberdetailTk.cardCode,
      mobilePhone: this.memberdetailTk.mobilePhone,
      memberId : this.memberdetailTk.memberId,
      list
    });
    this.http.post('/yeqs/curriculum/insertMemberRecord', { paramJson, flag:true }, false).then(res => {
      this.isLoading = false;
      if (res.code == 1000) {
        this.message.create('success', '排课成功！');
        let rows = res.result.reserveList;
        rows.sort(function(a,b){
            return Date.parse(a.currentDate) - Date.parse(b.currentDate);//时间正序
        });
        this.reserveList = rows;
        this.copywriting = res.result.copywriting;
        this.successOpen = true;
        this.isrepeat = false;
        this.showAdjust = false;
        this.listArr = [];
        this.kcName = [];
      } else {
        this.message.warning(res.info);
      }
    }); 

  }

  //查询课程类别
  selectSyllabusAll() {
    this.http.post('/yeqs/scheduling/selectSyllabusAll', {}, false).then(res => {
      if (res.code == 1000) {
        this.SyllabusAllList = res.result.list;
      } else {
        this.message.create('error', res.info);
      }
    });
  }

  // 查询课程
  selectlabel(data) {
    if(data){
    if (data.checked) {
      this.selectData = data;
      this.kcName.push(data);
      this.http.post('/yeqs/curriculum/selectIdRecord', { syllabusName: data.name, startDate: this.startDate, endDate: this.endDate }, false).then(res => {
        if (res.code == 1000) {
          //let arr = this.RecordList.concat(res.result.list);
          this.RecordList = this.RecordList.concat(res.result.list);
          this.datalabelList = [];
          this.RecordList1 = [];
          this.RecordList2 = [];
          this.RecordList3 = [];
          this.RecordList4 = [];
          this.RecordList5 = [];
          this.RecordList6 = [];
          this.RecordList7 = [];
          this.RecordList.map(item => {
            if (item.week == '星期一') {
              this.RecordList1.push(item);
            } else if (item.week == '星期二') {
              this.RecordList2.push(item);
            } else if (item.week == '星期三') {
              this.RecordList3.push(item);
            } else if (item.week == '星期四') {
              this.RecordList4.push(item);
            } else if (item.week == '星期五') {
              this.RecordList5.push(item);
            } else if (item.week == '星期六') {
              this.RecordList6.push(item);
            } else if (item.week == '星期日') {
              this.RecordList7.push(item);
            }
          })
        } else {
          this.message.create('error', res.info);
        }
      });
    } else {
      this.selectData = {};
      for(var i = 0; i < this.listArr.length; ) {
        if(this.listArr[i].name == data.name) {
          this.listArr.splice(i, 1);
        } else {
           i++;  //只有在没有删除元素时才对索引 i++
         }
       }
       for(var i = 0; i < this.kcName.length; ) {
        if(this.kcName[i].name == data.name) {
          this.kcName.splice(i, 1);
        } else {
           i++;  //只有在没有删除元素时才对索引 i++
         }
       }       

      let arr = JSON.parse(JSON.stringify(this.RecordList));
      for(var i = 0; i < arr.length; ) {
        if(arr[i].name == data.name) {
         arr.splice(i, 1);
        } else {
           i++;  //只有在没有删除元素时才对索引 i++
         }
       }
       this.RecordList = arr;
       this.datalabelList = [];
       this.RecordList1 = [];
       this.RecordList2 = [];
       this.RecordList3 = [];
       this.RecordList4 = [];
       this.RecordList5 = [];
       this.RecordList6 = [];
       this.RecordList7 = [];
       this.RecordList.map(item => {
         if (item.week == '星期一') {
           this.RecordList1.push(item);
         } else if (item.week == '星期二') {
           this.RecordList2.push(item);
         } else if (item.week == '星期三') {
           this.RecordList3.push(item);
         } else if (item.week == '星期四') {
           this.RecordList4.push(item);
         } else if (item.week == '星期五') {
           this.RecordList5.push(item);
         } else if (item.week == '星期六') {
           this.RecordList6.push(item);
         } else if (item.week == '星期日') {
           this.RecordList7.push(item);
         }
       })
     
    }
  }
}
  adjusting(){
    if (!this.checkedItems.length) {
      this.message.warning('请选择一条数据进行操作');
      return false;
    } 
    let memberId: number;
    this.listPage.eaTable.dataSet.map(res => {
      if (res.id == this.checkedItems[0]) {
        if(res.skillsStatus != 1){
          this.message.warning('该会员卡不支持调课！');
        }else{
          memberId = res.memberId;
          this.drawer.create({
            nzTitle: '会员调课',
            nzWidth: 960,
            nzContent: AdjustingComponent,
            nzContentParams: { id: memberId }
          })
        }
        
      }
    })
    // this.router.navigateByUrl(`/home/membercard/adjusting/${ memberId }`);

  }
  //选择课程
  datalabelChange(data) {
    //data.syllabusName = data.name;
    if (data.checked) {
      this.datalabelList.push(data);
      this.listArr.push(data);
    } else {
      for(var i = 0; i < this.datalabelList.length; ) {
        if(this.datalabelList[i].id == data.id) {
          this.datalabelList.splice(i, 1);
        } else {
           i++;  //只有在没有删除元素时才对索引 i++
         }
       }
      for(var i = 0; i < this.listArr.length; ) {
        if(this.listArr[i].id == data.id) {
          this.listArr.splice(i, 1);
        } else {
           i++;  //只有在没有删除元素时才对索引 i++
         }
       }

    }
  }
  
  noPassArranging(){
    this.passArranging = false;
  }
  isPassArranging(){
    this.http.post('/yeqs/curriculum/cancelReserve', { memberId: this.ItemsMemberId }, false).then(res => {
      if (res.code == 1000) {
        this.message.create('success', '取消成功！');
        this.passArranging = false;
      } else if(res.code == 1001) {
        this.message.create('error', '该用户没有排课！');
        this.passArranging = false;
      }else{
        this.message.create('error', res.info);
      }
    });
  }
  noArranging(){
    if (!this.checkedItems.length) {
      this.message.warning('请选择一条数据进行操作');
    } else {
      this.listPage.eaTable.dataSet.map(res => {
        if (res.id == this.checkedItems[0]) {
          if (res.skillsStatus != 1) {
            this.message.warning('只有技能课卡会员才能取消排课！');
          } else {
            this.ItemsMemberId = res.memberId;  
            this.passArranging = true;
          }
          
        }
      })
    } 
  }

  nowDate() {
    this.dateIndex = 0;
    this.datefun(0);
  };
  nextDate() {
    this.dateIndex++;
    this.datefun(this.dateIndex * 7);
  };
  prveDate() {
    if (this.dateIndex > 0) {
      this.dateIndex--;
      this.datefun(this.dateIndex * 7);
    }
  };
  datefun(index) {
    if (this.dateIndex == 0) {
      this.isBtnDisVled = true;
    } else {
      this.isBtnDisVled = false;
    }
    let now: any = new Date();
    let nowDayOfWeek = now.getDay();
    nowDayOfWeek = nowDayOfWeek == 0 ? 7 : nowDayOfWeek;
    this.startDate = this.showWeekFirstDay(1 - nowDayOfWeek + index);
    this.Tuesday = this.showWeekFirstDay(2 - nowDayOfWeek + index);;
    this.Wednesday = this.showWeekFirstDay(3 - nowDayOfWeek + index);;
    this.Thursday = this.showWeekFirstDay(4 - nowDayOfWeek + index);;
    this.Friday = this.showWeekFirstDay(5 - nowDayOfWeek + index);;
    this.Saturday = this.showWeekFirstDay(6 - nowDayOfWeek + index);;
    this.endDate = this.showWeekFirstDay(7 - nowDayOfWeek + index);
    if (!this.nowstartDate) {
      this.nowstartDate = this.startDate;
      this.nowendDate = this.endDate
    }
    this.RecordList = [];
    this.datalabelList = [];
    this.RecordList1 = [];
    this.RecordList2 = [];
    this.RecordList3 = [];
    this.RecordList4 = [];
    this.RecordList5 = [];
    this.RecordList6 = [];
    this.RecordList7 = [];
    this.kcName = [];
    this.listArr = [];
    this.SyllabusAllList.map(item=>{
      item.checked = false;
      item.arranging = null;
    })
  };
  showWeekFirstDay(i) {
    let that = this;
    var day3 = new Date();
    day3.setTime(day3.getTime() + i * 24 * 60 * 60 * 1000);
    let Month = (day3.getMonth() + 1) < 10 ? '0' + (day3.getMonth() + 1) : (day3.getMonth() + 1);
    let dayDate = (day3.getDate()) < 10 ? '0' + (day3.getDate()) : (day3.getDate());
    var s3 = day3.getFullYear() + "-" + Month + "-" + dayDate;
    return s3;
  }


}