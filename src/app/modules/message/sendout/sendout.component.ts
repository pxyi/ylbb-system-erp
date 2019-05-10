import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { QueryNode } from 'src/app/ng-relax/components/query/query.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { AppState } from 'src/app/core/reducers/reducers-config';

@Component({
  selector: 'app-sendout',
  templateUrl: './sendout.component.html',
  styleUrls: ['./sendout.component.less']
})
export class SendoutComponent implements OnInit {

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
      options: [{ name: '已办卡', id: 1 }, { name: '未办卡', id: 0 }]
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

  smsBalanceSurplus: number;

  queryLoading: boolean;

  brandName: string;

  constructor(
    private http: HttpService,
    private message: NzMessageService,
    private fb: FormBuilder = new FormBuilder(),
    private modal: NzModalService,
    private store: Store<AppState>
  ) {
    this.http.post('/smsBalance/balance').then(res => this.smsBalanceSurplus = res.result);

    this.http.post('/common/getStoreSmsTemplate').then(res => this.smsTemplateList = res.result);
    this.http.post('/smsBalance/balance').then(res => this.smsBalance = res.result);
  }
  ngOnInit() {
    this.store.select('userInfoState').subscribe(res => this.brandName = res.store.shopBrand.brandName);
    this.formGroup = this.fb.group({
      mobilePhones: [],
      type: [1],
      template: [],
      content: [, [Validators.required]]
    });
    /* ----------------------- 短信内容根据模板自动填充 ----------------------- */
    this.formGroup.get('template').valueChanges.subscribe(id => {
      this.smsTemplateList.map(item => item.id === id && this.formGroup.patchValue({ content: item.memo }));
    });
    this.formGroup.get('content').valueChanges.subscribe(val => {
      this.sendNum = this.selectList.length * (val && val.length + (this.brandName.length + 8) > 70 ? Math.ceil((val.length + (this.brandName.length + 8)) / 70) : 1);
    });
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
      this.save();
    }
  }



  /* ------------- 短信发送 ------------- */
  formGroup: FormGroup;
  smsTemplateList: any[] = [];
  smsBalance = 0;
  sendNum = 0;
  saveLoading: boolean;
  save() {
    if (this.smsBalanceSurplus <= 0) {
      this.message.warning('短信剩余条数不足，请充值后发送');
    } else if (this.formGroup.invalid) {
      for (let control in this.formGroup.controls) {
        this.formGroup.controls[control].markAsDirty();
        this.formGroup.controls[control].updateValueAndValidity();
      }
    } else if (this.smsBalance - this.sendNum < 0) {
      this.modal.confirm({
        nzTitle: '提示',
        nzContent: `短信剩余条数不足，公司已为您垫付<b>${this.smsBalance - this.sendNum}</b>条短信费用！此次发送成功后，如不续购短信，则不可再次发送。`,
        nzOnOk: () => this._sendSms()
      })
    } else {
      this._sendSms();
    }
  }

  _sendSms() {
    this.saveLoading = true;
    this.formGroup.patchValue({ mobilePhones: this.selectList.join(','), })
    this.http.post('/smsSend/sendSmsToConsume', {
      paramJson: JSON.stringify(this.formGroup.value)
    }, true).then(res => {
      this.saveLoading = false;
    });
  }
}
