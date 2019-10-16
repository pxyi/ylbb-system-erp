import { AppState } from 'src/app/core/reducers/reducers-config';
import { NzDrawerRef } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormArray, ValidatorFn, AbstractControl } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

declare const window: any;

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less']
})
export class CreateComponent implements OnInit {

  templateType = new Map([
    ['体验卡', 1],
    ['老带新',2],
    ['拼团',3],
    ['招聘',4],
    ['生日',6],
    ['返利',7],
    ['团购返利', 8]
  ])

  @Input() activityInfo: any = {};

  @Input() activityId;

  formGroup: FormGroup;

  customControls: any[] = [];

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private format: DatePipe,
    private drawerRef: NzDrawerRef,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.formGroup = this.fb.group({
      activityHeadline: [, [Validators.required, Validators.maxLength(30)]],
      startTime: [],
      endTime: [],
      time: [, [Validators.required]],
      activityRole: [, [Validators.required]],

      shareHeadline: [, [Validators.required, Validators.maxLength(26)]],
      shareDescribe: [, [Validators.required, Validators.maxLength(30)]],
      shareImg: [, [Validators.required]],

      otherContent: this.fb.group({})
    });
    this.formGroup.get('time').valueChanges.subscribe(res => {
      let [startTime, endTime] = res && res.length ? [this.format.transform(res[0], 'yyyy-MM-dd'), this.format.transform(res[1], 'yyyy-MM-dd')] : [null, null];
      this.formGroup.patchValue({ startTime, endTime });
    });
  }

  ngOnInit() {
    this.activityId ? this.http.post('/activity/getActivityDetail', { id: this.activityId }, false).then(res => {
      this.activityInfo = res.result.activity;
      this._templateInit();
    }) : this._templateInit();
  }

  formControlError(key, type = 'required') {
    return this.formGroup.controls[key].dirty && this.formGroup.controls[key].hasError(type);
  }

  get otherContent() { return this.formGroup.get('otherContent') as FormGroup };
  otherContentError(key, type = 'required') {
    return this.otherContent.controls[key].dirty && this.otherContent.controls[key].hasError(type);
  }

  get activityVouchers() { return this.formGroup.controls['activityVouchers'] as FormGroup; }
  activityVouchersError(key, type = 'required') {
    return this.activityVouchers.controls[key].dirty && this.activityVouchers.controls[key].hasError(type);
  }

  get activityPrizes() { return this.formGroup.controls['activityPrizes'] as FormArray; }
  activityPrizesError(key, i, type = 'required') {
    return this.activityPrizes.controls[i]['controls'][key].dirty && this.activityPrizes.controls[i]['controls'][key].hasError(type);
  }

  get activityGroupRule() { return this.formGroup.controls['activityGroupRule'] as FormGroup; }
  activityGroupRuleError(key, type = 'required') {
    return this.activityGroupRule.controls[key].dirty && this.activityGroupRule.controls[key].hasError(type);
  }

  get positionInfos() { return this.formGroup.controls['positionInfos'] as FormArray; }
  positionInfosError(key, i, type = 'required') {
    return this.positionInfos.controls[i]['controls'][key].dirty && this.positionInfos.controls[i]['controls'][key].hasError(type);
  }

  @ViewChild('preview') preview;
  private _templateInit() {
    /* ------------------- 预览H5活动 ------------------- */
    let storeId: number;
    this.store.select('userInfoState').subscribe(res => storeId = res.store.id);
    let iframe = document.createElement('iframe');
    iframe.width = '375';
    iframe.height = '602';
    iframe.frameBorder = '0';
    iframe.scrolling = 'no';
    iframe.src = `${this.activityInfo.templateUrl}?preview=true&storeId=${storeId}`;
    this.preview.nativeElement.appendChild(iframe);

    /* ------------------- 获取活动自定义字段 ------------------- */
    window.ERP_CALLBACK = (res) => {
      if (res) {
        this.customControls = res;
        this.customControls.map(control => {
          let validators = [];
          control.required && validators.push(Validators.required);
          control.minlength && validators.push(Validators.minLength(control.minlength));
          control.maxlength && validators.push(Validators.maxLength(control.maxlength));
          control.pattern && validators.push(Validators.pattern(control.pattern));
          this.otherContent.addControl(control.key, this.fb.control(control.default || null, validators));
        });
        this.activityId && this.otherContent.patchValue(JSON.parse(this.activityInfo.otherContent));
        delete window.ERP_CALLBACK;
      }
    }
    var script = window.document.createElement('script');
    script.src = `${this.activityInfo.templateDefined}/formGroup.js`;
    window.document.body.appendChild(script);
    script.onload = function () { script.remove(); }

    /* ------------------- 根据活动类型，单独添加活动字段 ------------------- */
    this._templateTypeAddFormGroup.get(this.activityInfo.templateType)();

    /* ------------------ 如果为编辑则回显内容 ------------------ */
    if (this.activityId) {
      this.activityInfo.time = [new Date(this.activityInfo.startTime), new Date(this.activityInfo.endTime)];
      this.formGroup.patchValue(this.activityInfo);
    } else if (this.activityInfo.templateIntroduce) {
      this.formGroup.patchValue(JSON.parse(this.activityInfo.templateIntroduce));
    }
  }

  previewHtml() {
    let params = JSON.parse(JSON.stringify(this.formGroup.value));
    params.otherContent = JSON.stringify(params.otherContent);
    let requestBody = this._templateTypeSave.get(this.activityInfo.templateType)(params);
    Object.keys(requestBody).map(key => !requestBody[key] && delete requestBody[key]);
    this.preview.nativeElement.getElementsByTagName('iframe')[0].src = `${this.activityInfo.templateUrl}?preview=true&params=${JSON.stringify(requestBody)}`;
  }

  /**
   * 根据活动类型 初始化响应式表单
   */
  private _templateTypeAddFormGroup = new Map([
    [this.templateType.get('体验卡'), () => {
      if (this.activityInfo.customPage && this.activityInfo.customPage == 1) {
        this.formGroup.addControl('activityImgs', this.fb.control(null, [Validators.required]));
      }
      this.formGroup.addControl('promotionPrice', this.fb.control({ value: null, disabled: !!this.activityId }, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), this._promotionPriceValidator({ isFormGroup: true, control: 'orgPrice' })]));
      this.formGroup.addControl('orgPrice', this.fb.control({ value: null, disabled: !!this.activityId }, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]));
      this.formGroup.addControl('needPay', this.fb.control({ value: null, disabled: !!this.activityId }, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]));
      this.formGroup.controls['orgPrice'].valueChanges.subscribe(res => this.formGroup.controls['promotionPrice'].updateValueAndValidity());
    }],
    [this.templateType.get('老带新'), () => {
      let expirationDate = this.activityId && this.activityInfo.activityPrizes[0].expirationDate ? new Date(this.activityInfo.activityPrizes[0].expirationDate) : null;
      this.formGroup.addControl('expirationDate', this.fb.control(expirationDate, [this._endTimeValidator()]));
      this.formGroup.addControl('activityPrizes', this.fb.array([]));
      if (this.activityId) {
        this.activityInfo.activityPrizes.map(prizeGroup => this.addActivityPrize(prizeGroup));
      } else {
        this.addActivityPrize({}, true);
      }

      this.formGroup.addControl('activityVouchers', this.fb.group({
        voucherMoney: [this.activityId ? this.activityInfo.activityVouchers[0].voucherMoney : null, [Validators.required, Validators.pattern(/^-?[1-9]\d*$/), Validators.maxLength(4)]],
        serviceableRange: [this.activityId ? this.activityInfo.activityVouchers[0].serviceableRange : null, [Validators.required]],
        expirationDate: [this.activityId ? this.activityInfo.activityVouchers[0].expirationDate : null, [this._endTimeValidator()]],
      }));
    }],
    [this.templateType.get('拼团'), () => {
      this.formGroup.addControl('activityGroupRule', this.fb.group({
        totalNum: [{ value: null, disabled: !!this.activityId }, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
        duration: [{ value: null, disabled: !!this.activityId }, [Validators.required]],
        productName: [{ value: null, disabled: !!this.activityId }, [Validators.required]],
        productDesc: [{ value: null, disabled: !!this.activityId }, [Validators.required]],
        productPic: [{ value: null, disabled: !!this.activityId }, [Validators.required]],
        orgPrice: [{ value: null, disabled: !!this.activityId }, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
        promotionPrice: [{ value: null, disabled: !!this.activityId }, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), this._promotionPriceValidator({ isFormGroup: false, group: 'activityGroupRule', control: 'orgPrice' })]],
      }));
      this.formGroup.controls['activityGroupRule']['controls']['orgPrice'].valueChanges.subscribe(res => this.formGroup.controls['activityGroupRule']['controls']['promotionPrice'].updateValueAndValidity())
    }],
    [this.templateType.get('招聘'), () => {
      this.formGroup.removeControl('time');
      this.formGroup.removeControl('startTime');
      this.formGroup.removeControl('endTime');
      this.formGroup.removeControl('activityRole');
      this.formGroup.addControl('aboutUs', this.fb.control(null, [Validators.required]));
      this.formGroup.addControl('welfareIntroduced', this.fb.control(null, [Validators.required]));
      this.formGroup.addControl('activityImgs', this.fb.control(null, [Validators.required]));
      this.formGroup.addControl('reviewsReq', this.fb.control(null, [Validators.required]));
      this.formGroup.addControl('positionInfos', this.fb.array([]));
      this.activityId ? this.activityInfo.positionInfos.map(positionInfo => this.addPositionInfos(positionInfo)) : this.addPositionInfos({});
    }],
    [this.templateType.get('生日'), () => {
      this.formGroup.removeControl('activityRole');
      this.formGroup.addControl('consumerType', this.fb.control(2, [Validators.required]));
      this.formGroup.addControl('invitationLanguage', this.fb.control(null, [Validators.required]));
      this.formGroup.addControl('birthdayLanguage', this.fb.control(null, [Validators.required, Validators.maxLength(45)]));
      this.formGroup.addControl('banquetProcess', this.fb.control(null, [Validators.required]));
      this.formGroup.addControl('activityImgs', this.fb.control(null, [Validators.required]));
    }],
    [this.templateType.get('返利'), () => {
      this.formGroup.removeControl('activityRole');
      this.formGroup.addControl('consumerType', this.fb.control(2, [Validators.required]));
      this.formGroup.addControl('cuePhrases', this.fb.control(null, [Validators.required]));
      this.formGroup.addControl('activityImgs', this.fb.control(null, [Validators.required]));
      this.formGroup.addControl('storeImgs', this.fb.control(null, [Validators.required]));
      this.formGroup.addControl('productName', this.fb.control(null, [Validators.required]));
      this.formGroup.addControl('promotionPrice', this.fb.control(null, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]));
      this.formGroup.addControl('rebateRatio', this.fb.control(null, [Validators.required, Validators.pattern(/^(?:0|[1-9]\d?)$/)]));
    }],
    [this.templateType.get('团购返利'), () => {
      this.formGroup.removeControl('activityRole');
      this.formGroup.addControl('cuePhrases', this.fb.control(null, [Validators.required]));
      this.formGroup.addControl('consumerType', this.fb.control(2, [Validators.required]));
      this.formGroup.addControl('storeImgs', this.fb.control(null, [Validators.required]));
      this.formGroup.addControl('orgPrice', this.fb.control(null, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]));
      this.formGroup.addControl('promotionPrice', this.fb.control(null, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]));
      this.formGroup.addControl('activityGroupRule', this.fb.group({
        drawSwitch: [{ value: 1, disabled: !!this.activityId}, [Validators.required]],
        productName: [, [Validators.required]],
        productDesc: [, [Validators.required]],
        rebateRatioOne: [{ value: null, disabled: !!this.activityId }, [Validators.required, Validators.pattern(/^[1-9]\d{0,1}$/)]],
        rebateRatioTwo: [{ value: null, disabled: !!this.activityId }, [Validators.required, Validators.pattern(/^[1-9]\d{0,1}$/)]],
        groupRule: [, [Validators.required]],
        luckyNumber: [, [Validators.required]],
        lotteryExplain: [, [Validators.required]]
      }))
      this.formGroup.controls['activityGroupRule']['controls']['drawSwitch'].valueChanges.subscribe(res => {
        if (res) {
          this.formGroup.controls['activityGroupRule']['addControl']('luckyNumber', this.fb.control(null, [Validators.required]));
          this.formGroup.controls['activityGroupRule']['addControl']('lotteryExplain', this.fb.control(null, [Validators.required]));
        } else {
          this.formGroup.controls['activityGroupRule']['removeControl']('luckyNumber');
          this.formGroup.controls['activityGroupRule']['removeControl']('lotteryExplain');
        }
      })
    }]
  ]);


  saveLoading: boolean;
  save() {
    if (this.formGroup.invalid) {
      this._templateTypeValidator.get(0)();
      this._templateTypeValidator.get(this.activityInfo.templateType)();
    } else {
      this.saveLoading = true;
      let params = this.formGroup.value;
      if (this.activityId) {
        params.id = this.activityId;
        params.templateId = this.activityInfo.templateId;
      } else {
        params.templateId = this.activityInfo.id;
      }
      params.otherContent = JSON.stringify(params.otherContent);
      let requestBody = this._templateTypeSave.get(this.activityInfo.templateType)(params);
      this.http.post('/activity/savePromotionActivity', { paramJson: JSON.stringify(requestBody) }).then(res => {
        this.saveLoading = false;
        if (this.activityId) {
          this.drawerRef.close(true)
        } else {
          this.drawerRef.close();
          this.router.navigateByUrl('/home/marketing/list');
        }
      }).catch(err => this.saveLoading = false)
    }
  }

  /**
   * 根据活动类型 设置保存参数
   */
  private _templateTypeSave = new Map([
    [this.templateType.get('体验卡'), (params) => {
      return params;
    }],
    [this.templateType.get('老带新'), (params) => {
      params.activityPrizes.map(prize => prize.expirationDate = params.expirationDate ? this.format.transform(params.expirationDate, 'yyyy-MM-dd') : null);
      return params;
    }],
    [this.templateType.get('拼团'), (params) => {
      return params;
    }],
    [this.templateType.get('招聘'), (params) => {
      return params;
    }],
    [this.templateType.get('生日'), (params) => {
      return params;
    }],
    [this.templateType.get('返利'), (params) => {
      return params;
    }],
    [this.templateType.get('团购返利'), (params) => {
      return params;
    }]
  ])

  private _templateTypeValidator = new Map([
    [0, () => {
      let controls = this.formGroup.controls;
      Object.keys(controls).map(key => {
        controls[key].markAsDirty();
        controls[key].updateValueAndValidity();
      })
      let otherContent = this.otherContent.controls;
      Object.keys(otherContent).map(key => {
        otherContent[key].markAsDirty();
        otherContent[key].updateValueAndValidity();
      });
    }],
    [this.templateType.get('体验卡'), () => { }],
    [this.templateType.get('老带新'), () => {
      let activityVouchers = this.activityVouchers.controls;
      Object.keys(activityVouchers).map(key => {
        activityVouchers[key].markAsDirty();
        activityVouchers[key].updateValueAndValidity();
      });
      let activityPrizes = this.activityPrizes.controls;
      activityPrizes.map(prize => {
        Object.keys(prize['controls']).map(c => {
          prize['controls'][c].markAsDirty();
          prize['controls'][c].updateValueAndValidity();
        });
      });
    }],
    [this.templateType.get('拼团'), () => {
      let activityGroupRule = this.activityGroupRule.controls;
      Object.keys(activityGroupRule).map(key => {
        activityGroupRule[key].markAsDirty();
        activityGroupRule[key].updateValueAndValidity();
      });
    }],
    [this.templateType.get('招聘'), () => {
      let positionInfos = this.positionInfos.controls;
      positionInfos.map(position => {
        Object.keys(position['controls']).map(c => {
          position['controls'][c].markAsDirty();
          position['controls'][c].updateValueAndValidity();
        });
      });
    }],
    [this.templateType.get('生日'), () => { }],
    [this.templateType.get('返利'), () => { }],
    [this.templateType.get('团购返利'), () => {
      let activityGroupRule = this.activityGroupRule.controls;
      Object.keys(activityGroupRule).map(key => {
        activityGroupRule[key].markAsDirty();
        activityGroupRule[key].updateValueAndValidity();
      });
    }],
  ]);

  /* ----------- 新增 老带新奖项设置 ----------- */
  addActivityPrize(info: any = {}, isInit?: boolean) {
    let params = isInit ? {
      recommendedAmount: 2,
      prizeName: '儿童卡通书包',
      prizeIntroduction: '成功推荐2人到店，可获得儿童卡通书包一个',
      prizeImg: 'http://ylbb-business.oss-cn-beijing.aliyuncs.com/ertongshubao.jpg',
      prizeLevel: 1
    } : info;
    this.activityPrizes.push(this.fb.group({
      recommendedAmount: [params.recommendedAmount || null, [Validators.required, Validators.pattern(/^-?[1-9]\d*$/), this._recommendedValidator(this.activityPrizes.length)]],
      prizeName: [params.prizeName || null, [Validators.required, Validators.maxLength(10)]],
      prizeIntroduction: [params.prizeIntroduction || null, [Validators.required, Validators.maxLength(36)]],
      prizeImg: [params.prizeImg || null, [Validators.required]],
      prizeLevel: [params.prizeLevel || this.activityPrizes.length + 1]
    }))
  }

  /* ----------- 新增 招聘岗位 ----------- */
  addPositionInfos(info: any = {}) {
    this.positionInfos.push(this.fb.group({
      id: [info.id],
      jobTitle: [info.jobTitle, [Validators.required]],
      jobResponsibilities: [info.jobResponsibilities, [Validators.required]],
      jobRequirements: [info.jobRequirements, [Validators.required]]
    }))
  }

  cancel() { this.drawerRef.close() }

  /* ----------- 老带新活动 兑换截止日期 校验（截止日期必须大于活动结束日期） ----------- */
  private _endTimeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      try {
        let minTime = this.formGroup.get('endTime').value;
        return minTime && control.value && new Date(this.format.transform(control.value, 'yyyy-MM-dd')).getTime() <= new Date(minTime).getTime() ? { 'error': true } : null;
      } catch (error) {
        return null;
      }
    };
  }

  /* ----------- 老带新活动 推荐好友数量 校验（必须大于前一组推荐好友数量） ----------- */
  private _recommendedValidator(idx): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let minNum = idx > 0 && this.activityPrizes ? this.activityPrizes.controls[idx - 1]['controls']['recommendedAmount'].value : 0;
      return this.activityPrizes && this.activityPrizes.controls.length == 1 || control.value > minNum ? null : { error: true };
    };
  }

  private _promotionPriceValidator(options: { isFormGroup: boolean, group?: string, control: string }): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      try {
        var minControl = options.isFormGroup ? this.formGroup.controls[options.control] : this[options.group].controls[options.control];
        let minNum = Number(minControl.value);
        return control.value >= minNum && minControl.value ? { error: true } : null;
      } catch (error) {
        return null;
      }
    };
  }


}
