import { HttpService } from 'src/app/ng-relax/services/http.service';
import { CacheService } from '../../../ng-relax/services/cache.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
import { MonthdiffPipe } from '../../../ng-relax/pipes/monthdiff.pipe';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-newinformation',
  templateUrl: './newinformation.component.html',
  styleUrls: ['./newinformation.component.scss']
})
export class NewinformationComponent implements OnInit {


  _id            : string;

  _submitLoading : boolean;

  _selectLoading : boolean;

  customerForm   : FormGroup;

  customerFormInitValue: object = {};

  collectorList     : any[] = [];
  recommenderList   : any[] = []; 
  sourceList        : any[] = [];
  parentIdentityList: any[] = [];
  followStageList   : any[] = [];
  showCommunityList : any[] = [];

  constructor(
    private fb        : FormBuilder = new FormBuilder(),
    private routeInfo : ActivatedRoute,
    private router    : Router,
    private http      : HttpService,
    private message   : NzMessageService,
    private modal     : NzModalService,
    private format    : DatePipe,
    private monthDiff : MonthdiffPipe,
    private cache     : CacheService
  ) { }

  ngOnInit() {
    this.routeInfo.paramMap.subscribe((res: any) => {
      this._id = res.params.id;

      this._customerFormInit();
      if (this._id != '0') {
        this._selectLoading = true;
        this.http.post('/customer/showCustomerInfo', { paramJson: JSON.stringify({ id: this._id }) }, false).then(res => {
          this._selectLoading = false;
          if (res.code == 1000) {
            res.result.member.birthday = res.result.member.birthday ? new Date(res.result.member.birthday) : '';
            this.customerForm.patchValue(res.result.member);
            this.customerFormInitValue = this.customerForm.value;
          }
        });

        this.http.post('/common/lookParentTelphone', { paramJson: JSON.stringify({ id: this._id }) }).then(res => {
          this.customerForm.patchValue({
            mobilePhone: res.result.mobilePhone
          });
          this.customerFormInitValue['mobilePhone'] = res.result.mobilePhone;
        });

      }

    });


    this.cache.get('/common/collectorList').subscribe(res => this.collectorList = res);
    this.cache.get('/common/recommenderList').subscribe(res => this.recommenderList = res);
    this.cache.get('/common/sourceList').subscribe(res => this.sourceList = res);
    this.cache.get('/common/parentIdentityList').subscribe(res => this.parentIdentityList = res);
    this.cache.get('/common/followStageList').subscribe(res => this.followStageList = res);
    this.cache.get('/common/showCommunityList').subscribe(res => this.showCommunityList = res);
  }

  _customerFormInit(obj: any = {}) {
    this.customerForm = this.fb.group({
      nick: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],     // 宝宝昵称
      name: [''],                                                                               // 宝宝姓名
      sex: ['男'],                                                                             // 宝宝性别
      ethnic: [''],                                                                               // 民族
      birthday: ['', [Validators.required]],                                                       // 宝宝生日
      constellation: [{ value: '', disabled: true }],                                                                               // 星座
      babyType: [''],                                                                               // 宝宝类型
      communityId: [''],                                                                               // 所属小区
      visitRemarks: ['', [Validators.maxLength(300)]],                                                  // 备注

      parentName: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],     // 家长姓名
      mobilePhone: ['', [Validators.required, Validators.pattern(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/)], [this._parentPhoneAsyncValidator]],
      parentRelationShipId: ['', [Validators.required]],                                                        // 家长身份
      parentWeChat: ['', [Validators.pattern(/^[A-Za-z0-9]{6,30}/)]],                                   // 家长QQ或者微信

      sourceId: ['', [Validators.required]],                                                        // 来源
      recommendedId: [''],                                                                               // 推荐人
      collectorId: [''],                                                                               // 收集人
    });
    this.customerFormInitValue = this.customerForm.value;
    this.customerForm.get('birthday').valueChanges.subscribe(res => {
      this.customerForm.patchValue({
        constellation: res ? this._getAstro(this.format.transform(res, 'yyyy-MM-dd').split('-')[1], this.format.transform(res, 'yyyy-MM-dd').split('-')[2]) : '',
        babyType: !res ? '' : this.monthDiff.transform(this.format.transform(res, 'yyyy-MM-dd')) > 10 ? '幼儿' : '婴儿'
      });
    });

    this.customerForm.get('nick').valueChanges.subscribe(res => {
      this.customerForm.patchValue({
        parentName: `${res}家长`
      });
    });
    this.customerForm.get('parentRelationShipId').valueChanges.subscribe(res => {
      this.parentIdentityList.map(item => {
        if (item.id == res) {
          this.customerForm.patchValue({
            parentName: this.customerForm.get('nick').value + item.name
          });
        }
      })
    })

  }

  _submit(): void {
    if (this.customerForm.invalid) {
      for (let i in this.customerForm.controls) {
        this.customerForm.controls[i].markAsDirty();
        this.customerForm.controls[i].updateValueAndValidity();
      }
    } else {
      this._submitLoading = true;
      this.customerFormInitValue = this.customerForm.value;
      let params = this._id == '0' ? this.customerForm.value : Object.assign(this.customerForm.value, { id: this._id });
      if (params.birthday) { params.birthday = this.format.transform(params.birthday, 'yyyy-MM-dd') }
      this.http.post('/customer/modifyUserInfo', { paramJson: JSON.stringify(params) }, false).then(res => {
        this.message.create(res.code == 1000 ? 'success' : 'warning', res.info);
        if (res.code == 1000) {
          this.router.navigateByUrl('/home/customer/potential');
        } else {
          this._submitLoading = false;
        }
      })
    }
  }

  getFormControl(name) {
    return this.customerForm.controls[name];
  }


  /* ----------------------- 新建小区 ----------------------- */
  _ceateHousingModal;
  housingName: string;
  isConfirmLoading: boolean = false;
  ceateHousing(title, content, footer): void {
    this._ceateHousingModal = this.modal.create({
      nzTitle: title,
      nzContent: content,
      nzFooter: footer
    });
  }
  submitHousing(): void {
    if (this.housingName.length && !this.isConfirmLoading) {
      this.isConfirmLoading = true;
      this.http.post(`/common/addCommunity`, { paramJson: JSON.stringify({ name: this.housingName }) }, false).then(res => {
        this.message.create(res.code == 1000 ? 'success' : 'warning', res.info);
        if (res.code == 1000) {
          this._ceateHousingModal.destroy();
          this.showCommunityList.unshift(res.result)
        }
        this.isConfirmLoading = false;
      })
    }
  }

  /* ----------------------- 计算星座 ----------------------- */
  _getAstro(month?, day?): string {
    if (!month) { return ''; }
    var s = "魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
    var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
    return s.substr(month * 2 - (day < arr[month - 1] ? 2 : 0), 2) + '座';
  }


  _parentPhoneAsyncValidator = (control: FormControl): any => {
    return Observable.create(observer => {
      let params: any = { mobilePhone: this.customerForm.get('mobilePhone').value };
      if (this._id != '0') { params.id = this._id; }
      this.http.post('/common/checkTelphoneNum', { paramJson: JSON.stringify(params) }, false).then(res => {
        observer.next(res.result ? null : { error: true, duplicated: true });
        observer.complete();
      }, err => {
        observer.next(null);
        observer.complete();
      })
    })
  };

  _disabledDate(current: Date): boolean {
    return current && current.getTime() > Date.now();
  }

}
