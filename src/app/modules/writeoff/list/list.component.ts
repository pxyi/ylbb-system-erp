import { DatePipe } from '@angular/common';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { AppState } from 'src/app/core/reducers/reducers-config';
import { Store } from '@ngrx/store';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @ViewChild('breadcrumbTmpt') breadcrumbTmpt: TemplateRef<any>;

  queryNode = [
    {
      label       : '来源',
      key         : 'source',
      type        : 'select',
      optionsUrl  : '/verification/getSourceList'
    },
    {
      label       : '状态',
      key         : 'status',
      type        : 'select',
      options     : [ { name: '未提现', id: 0 }, { name: '提现中', id: 1 }, { name: '已提现', id: 2 } ]
    },
    {
      label       : '手机号',
      key         : 'phoneNum',
      type        : 'input'
    }
  ];

  amountSum = { totalAmount: 0, totalBalance: 0 };

  queryForm: FormGroup;

  formGroup: FormGroup;

  communityList: any[] = [];

  constructor(
    private http: HttpService,
    private store: Store<AppState>,
    private modal: NzModalService,
    private message: NzMessageService,
    private fb: FormBuilder = new FormBuilder(),
    private format: DatePipe
  ) { 
    /* ----------------------- 获取该门店下所有小区 ----------------------- */
    this.http.post('/member/communityList', {}, false).then(res => {
      this.communityList = res.result;
    });

    this.http.post('/verification/amountSum', {}, false).then(res => this.amountSum = res.result);
    this.queryForm = new FormGroup({
      mobilePhone: new FormControl(null, [Validators.required, Validators.pattern(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/)])
    });
    this.formGroup = this.fb.group({
      name: [, [Validators.required]],
      nick: [],
      sex: ['男'],
      birthday: [, [Validators.required]],
      parentName: [, [Validators.required]],
      fixPhone: [, Validators.pattern(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/)],
      mobilePhone: [],
      communityId: [, [Validators.required]],
      illHistory: [, [Validators.required]],
      allergieHistory: [, [Validators.required]],
      babyType: ['婴儿'],
      babyNumber: [],
      source: [],
      comment: []
    })
  }

  ngOnInit() {
    this.store.dispatch({ type: 'setBreadcrumb', payload: this.breadcrumbTmpt });
  }

  searchLoading: boolean;
  search(couponCode) {
    if (couponCode) {
      this.searchLoading = true;
      this.http.post('/verification/testCoupons', { couponCode }).then(res => {
        this.searchLoading = false;
        this.writeInfo = res.result;
        this.showDrawer = true;
      }).catch(err => this.searchLoading = false)
    } else {
      this.message.warning('请输入劵号')
    }
  }

  putForward() {
    this.modal.warning({ nzTitle: '温馨提示', nzContent: '可提现金额积满2000元才可以提现哦~'});
  }

  showDrawer: boolean;
  writeInfo;
  validatorLoading: boolean;
  validator() {
    if (this.queryForm.invalid) {
      this.queryForm.get('mobilePhone').markAsDirty();
      this.queryForm.get('mobilePhone').updateValueAndValidity();
    } else {
      this.validatorLoading = true;
      this.http.post('/verification/testPhone', this.queryForm.value, false).then(res => {
        this.validatorLoading = false;
        if (res.code == 1000) {
          this.formGroup.patchValue(this.queryForm.value);
        } else if (res.code == 1002) {
          this.modal.confirm({
            nzTitle: '确认核销', 
            nzContent: res.info, 
            nzOnOk: () => {
              this.http.post('/verification/verificationCoupons', {
                paramJson: JSON.stringify(Object.assign(this.queryForm.value, {
                  mermberSource: this.writeInfo.sourceId,
                  couponId: this.writeInfo.id
                })) 
              }).then(res => {
                this.showDrawer = false; 
                this.queryForm.reset();
                this.formGroup.reset();
              })
            } 
          })
        } else {
          this.message.warning(res.info);
          this.validatorLoading = false;
        }
      })
    }
  }

  saveLoading: boolean;
  save() {
    if (this.formGroup.invalid) {
      for (let control in this.formGroup.controls) {
        this.formGroup.controls[control].markAsDirty();
        this.formGroup.controls[control].updateValueAndValidity();
      }
    } else {
      this.saveLoading = true;
      let params = this.formGroup.value;
      params.couponId = this.writeInfo.id;
      params.birthday =  this.format.transform(params.birthday, 'yyyy-MM-dd');
      this.http.post('/verification/saveCustomer', { paramJson: JSON.stringify(this.formGroup.value) }).then(res => {
        this.saveLoading = false;
        this.showDrawer = false;
        this.formGroup.reset();
        this.queryForm.reset();
      }).catch(err => this.saveLoading = false);
    }
  }


  /* ------------ 宝宝生日禁止选择今天以后的日期 ------------ */
  _disabledDate(current: Date): boolean {
    return current && current.getTime() > Date.now();
  }

}
