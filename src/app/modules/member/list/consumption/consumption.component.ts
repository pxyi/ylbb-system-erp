import { NzDrawerRef } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';

@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.scss']
})
export class ConsumptionsComponent implements OnInit, OnDestroy {

  @Input() id;

  @Input() memberCardInfo;

  baseFormGroup: FormGroup;
  timesCountGroup: FormGroup;
  singleTimeGroup: FormGroup;

  consumptionType: number = 0;

  teacherList: any[] = [];
  communityList: any[] = [];
  swimRingList: any[] = [];
  memberCardList: any[] = [];
  commoditieListdc: any[] = [];
  commoditieListjc: any[] = [];

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef
  ) { 
  }

  ngOnInit() {
    
    this.baseFormGroup = this.fb.group({
      memberId: [this.memberCardInfo.memberId],
      name: [{ value: this.memberCardInfo.name, disabled: true }],
      nick: [{ value: this.memberCardInfo.nick, disabled: true }],
      sex: [{ value: this.memberCardInfo.sex, disabled: true }],
      monthAge: [{ value: this.memberCardInfo.monthAge, disabled: true }],
      comment: []
    });

    this.timesCountGroup = this.fb.group({
      cardId: [, [Validators.required]],
      swimTeacherId: [, [Validators.required]],
      assisTeacherId: [, [Validators.required]],
      showerTeacherId: [],
      fitnessTeacherId: [],
      commodityId: [, [Validators.required]],
      consumption: [, [Validators.required]],
      ringId: [],
      swimDuration: [],
      temperaturePost: [],
      weight: [],
      temperature: [],
      satisfaction: ['满意', [Validators.required]],
      consumeDate: [{ value: null, disabled: true }],
      reserveStatus:[0]
    });
    this.singleTimeGroup = this.fb.group({
      commodityId: [, [Validators.required]],
      consumption: [, [Validators.required]],
      swimTeacherId: [, [Validators.required]],
      assisTeacherId: [, [Validators.required]], 
      showerTeacherId: [],
      fitnessTeacherId: [],
      satisfaction: ['满意', [Validators.required]],
      consumeDate: [{ value: null, disabled: true }],
      reserveStatus:[0]
    });

    /* ------------------------- 消费服务、商品改变自动填写消费金额 ------------------------- */
    this.timesCountGroup.get('commodityId').valueChanges.subscribe(id => {
      this.http.post('/yeqs/customer/price', { id, cardId: this.timesCountGroup.get('cardId').value }, false).then(res => {
        this.timesCountGroup.patchValue({ consumption: res.result.price });
      })
    });
    this.singleTimeGroup.get('commodityId').valueChanges.subscribe(id => {
      this.commoditieListdc.map(res => res.id === id && this.singleTimeGroup.patchValue({ consumption: res.price }));
    });

    /* ------------------------- 消费卡改变触发消费服务列表刷新 ------------------------- */
    this.timesCountGroup.get('cardId').valueChanges.subscribe(cardId => {
      this.timesCountGroup.patchValue({ commodityId: null, consumption: null });
      this.http.post('/yeqs/customer/changeCommodity', { cardId }, false).then(res => {
        this.commoditieListjc = res.result;
        this.timesCountGroup.patchValue({ commodityId: res.result[0].id });
      });
    });


    /* ------------------------- 获取服务器时间 ------------------------- */
    this.http.post('/yeqs/customer/getSystemDate', {}, false).then(res => {
      this.timesCountGroup.patchValue({ consumeDate: res.result });
      this.singleTimeGroup.patchValue({ consumeDate: res.result });
    });

    /* -------------------- 获取下拉列表数据 -------------------- */
    this.http.post('/yeqs/member/getStoreTeachers', {}, false).then(res => {
      this.teacherList = res.result;
      this.timesCountGroup.patchValue({ swimTeacherId: res.result[0].id });
      this.singleTimeGroup.patchValue({ swimTeacherId: res.result[0].id });
    });
    this.http.post('/yeqs/member/communityList', {}, false).then(res => this.communityList = res.result);
    this.http.post('/swimRing/getStoreSwimRings', {}, false).then(res => this.swimRingList = res.result);
    this.http.post('/yeqs/memberCard/getMemberCards', { memberId: this.memberCardInfo.memberId }, false).then(res => {
      this.memberCardList = res.result;
      res.result.length && this.timesCountGroup.patchValue({ cardId: res.result[0].id });
    });

    this.http.post('/commodity/getCommonCommodities', {}, false).then(res => {
      this.commoditieListdc = res.result;
      /* ------------------------- 判断是否有默认商品 ------------------------- */
      res.result.map(item => item.defaulttag && this.singleTimeGroup.patchValue({ commodityId: item.id }))
    });
  }

  ngOnDestroy() {
  }

  @DrawerClose() close: () => void;
  saveLoading: boolean;
  save() {
      let baseValue = {};
      Object.keys(this.baseFormGroup.controls).map(key => {
        baseValue[key] = this.baseFormGroup.controls[key].value;
      })
      if (this.consumptionType === 0) {
        if (this.timesCountGroup.invalid) {
          for (let i in this.timesCountGroup.controls) {
            this.timesCountGroup.controls[i].markAsDirty();
            this.timesCountGroup.controls[i].updateValueAndValidity();
          }
        } else {
          this.saveLoading = true;
          this.http.post('/yeqs/customer/create', { paramJson: JSON.stringify(Object.assign(baseValue, this.timesCountGroup.value)), settleStatus: 0 }).then(res => {
            this.drawerRef.close(true);
          })
        }
      } else {
        if (this.singleTimeGroup.invalid) {
          for (let i in this.singleTimeGroup.controls) {
            this.singleTimeGroup.controls[i].markAsDirty();
            this.singleTimeGroup.controls[i].updateValueAndValidity();
          }
        } else {
          this.saveLoading = true;
          this.http.post('/yeqs/customer/create', { paramJson: JSON.stringify(Object.assign(baseValue, this.singleTimeGroup.value)), settleStatus: 0 }).then(res => {
            this.drawerRef.close(true);
          })
        }
      }
  }

}
