import { NzDrawerRef, NzModalService } from 'ng-zorro-antd';
import { HttpService } from './../../../../ng-relax/services/http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() phoneList;

  formGroup: FormGroup;

  smsTemplateList: any[] = [];

  smsBalance = 0;
  sendNum = 0;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef<boolean>,
    private modal: NzModalService
  ) { 
    this.http.post('/common/getStoreSmsTemplate', {}, false).then(res => this.smsTemplateList = res.result);
    this.http.post('/smsBalance/balance', {}, false).then(res => this.smsBalance = res.result)
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      mobilePhones: [this.phoneList.join(',')],
      type: [1],
      template: [],
      content: [, [Validators.required]]
    });
    /* ----------------------- 短信内容根据模板自动填充 ----------------------- */
    this.formGroup.get('template').valueChanges.subscribe(id => {
      this.smsTemplateList.map(item => item.id === id && this.formGroup.patchValue({ content: item.memo }));
    });
    this.formGroup.get('content').valueChanges.subscribe(val => {
      this.sendNum = this.phoneList.length * (val && val.length > 60 ? Math.ceil(val.length / 60) : 1);
    })
  }

  saveLoading: boolean;
  save() {
    if (this.formGroup.invalid) {
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
    this.http.post('/smsSend/sendSmsToConsume', {
      paramsJson: JSON.stringify(this.formGroup.value)
    }).then(res => {
      this.drawerRef.close(true);
      this.saveLoading = false;
    });
  }

  close() {
    this.drawerRef.close();
  }

}
