import { FormComponent } from './form/form.component';
import { NzDrawerService, NzMessageService } from 'ng-zorro-antd';
import { QueryNode } from 'src/app/ng-relax/components/query/query.component';
import { HttpService } from './../../../ng-relax/services/http.service';
import { AppState } from './../../../core/reducers/reducers-config';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sendout',
  templateUrl: './sendout.component.html',
  styleUrls: ['./sendout.component.scss']
})
export class SendoutComponent implements OnInit {

  @ViewChild('breadcrumbTmpt') breadcrumbTmpt: TemplateRef<any>; 

  queryNode: QueryNode[] = [
    {
      label: '会员卡号',
      key: 'cardCode',
      type: 'input'
    },
    {
      label: '会员姓名',
      key: 'name',
      type: 'input'
    },
    {
      label: '会员小名',
      key: 'nick',
      type: 'input'
    },
    {
      label: '手机号',
      key: 'mobilePhone',
      type: 'input'
    },
    {
      label: '所属社区',
      key: 'communityId',
      type: 'select',
      optionsUrl: '/member/communityList'
    },
    {
      label: '婴儿类型',
      key: 'babyType',
      type: 'select',
      options: [{ name: '婴儿', id: '婴儿' }, { name: '幼儿', id: '幼儿' }]
    },
    {
      label: '是否办卡',
      key: 'havacard',
      type: 'select',
      options: [{ name: '已办卡', id: 0 }, { name: '未办卡', id: 1 }]
    },
    {
      label: '近期消费',
      key: 'consumeDate',
      type: 'select',
      options: [{ name: '1星期内', id: 0 }, { name: '15天内', id: 1 }, { name: '1个月内', id: 2 }, { name: '2个月内', id: 3 }]
    },
    {
      label: '卡过期',
      key: 'expiredDate',
      type: 'select',
      options: [{ name: '1星期内', id: 0 }, { name: '15天内', id: 1 }, { name: '1个月内', id: 2 }, { name: '2个月内', id: 3 }]
    },
    {
      label: '剩余卡次',
      key: 'times',
      type: 'select',
      options: [{ name: '3次以内', id: 3 }, { name: '5次以内', id: 5 }, { name: '10次以内', id: 10 }, { name: '20次以内', id: 20 }]
    },
    {
      label: '卡状态',
      key: 'status',
      type: 'select',
      options: [{ name: '正常', id: 0 }, { name: '停卡', id: 1 }, { name: '过期', id: 2 }]
    },
    {
      label: '卡类型',
      key: 'cardTypeId',
      type: 'select',
      optionsUrl: '/cardTypeManagement/findList'
    }
  ]

  transferList: any[] = [];

  smsBalance: number;

  queryLoading: boolean;

  constructor(
    private store: Store<AppState>,
    private http: HttpService,
    private drawer: NzDrawerService,
    private message: NzMessageService
  ) { 
    this.http.post('/smsBalance/balance', {}, false).then(res => this.smsBalance = res.result)
  }
  ngOnInit() {
    this.store.dispatch({ type: 'setBreadcrumb', payload: this.breadcrumbTmpt });
    this.query();
  }

  query(params = {}) {
    if (!this.queryLoading) {
      this.queryLoading = true;
      this.http.post('/smsSend/list', { paramJson: JSON.stringify(params) }, false).then(res => {
        res.result.list.map(res => res.title = res.name + res.mobilePhone)
        this.transferList = res.result.list;
        this.queryLoading = false;
        this.selectList = [];
      }).catch(_ => this.queryLoading = false);
    }
  }

  selectList: any[] = [];
  change(map) {
    if (map.from == 'left') {
      map.list.map(item => this.selectList.push(item.mobilePhone));
    } else {
      map.list.map((item, idx) => this.selectList.indexOf(item.mobilePhone) != -1 && this.selectList.splice(this.selectList.indexOf(item.mobilePhone), 1));
    }
  }


  sendout() {
    if (!this.selectList.length) {
      this.message.warning('请选择需要发送的手机号码')
    } else {
      this.drawer.create({
        nzWidth: 720,
        nzTitle: '发送短信',
        nzContent: FormComponent,
        nzContentParams: { phoneList: this.selectList }
      });
    }
  }


}
