import { NzDrawerRef } from 'ng-zorro-antd';
import { HttpService } from './../../../../ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-consumptions',
  templateUrl: './consumptions.component.html',
  styleUrls: ['./consumptions.component.scss']
})
export class ConsumptionsComponents implements OnInit {

  @Input() appointmentInfo;

  baseFormGroup: FormGroup;
  timesCountGroup: FormGroup;
  singleTimeGroup: FormGroup;

  teacherList: any[] = [];
  communityList: any[] = [];
  swimRingList: any[] = [];
  memberCardList: any[] = [];
  commoditieList: any[] = [];
  commodityList: any[] = [];

  consumptionType: number;

  constructor(
    private http: HttpService,
    private drawerRef: NzDrawerRef<boolean>,
    private fb: FormBuilder = new FormBuilder()
  ) { }

  ngOnInit() {
    /* ---------------- 根据有无会员卡选择消费方式 ---------------- */
    this.consumptionType = this.appointmentInfo.cardId ? 0 : 1;
    
    this.baseFormGroup = this.fb.group({
      reserveId: [this.appointmentInfo.id],
      memberId: [this.appointmentInfo.memberId],
      name: [{ value: this.appointmentInfo.name, disabled: true }],
      nick: [{ value: this.appointmentInfo.nick, disabled: true }],
      sex: [{ value: this.appointmentInfo.sex, disabled: true }],
      monthAge: [{ value: this.appointmentInfo.monthAge, disabled: true }],
      comment: []
    });
    this.timesCountGroup = this.fb.group({
      cardId: [, [Validators.required]],
      swimTeacherId: [, [Validators.required]],
      assisTeacherId: [, [Validators.required]],
      showerTeacherId: [],
      fitnessTeacherId:[],
      commodityId: [, [Validators.required]],
      consumption: [, [Validators.required]],
      pulmonary: [],
      swimDuration: [],
      temperaturePost: [],
      weight: [],
      temperature: [],
      satisfaction: ['满意'],
      consumeDate: [],
      settleStatus: [0],
      reserveStatus: [ this.appointmentInfo.reserveStatus ]
    });
    this.singleTimeGroup = this.fb.group({
      commodityId: [, [Validators.required]],
      consumption: [],
      swimTeacherId: [, [Validators.required]],
      assisTeacherId: [, [Validators.required]],
      showerTeacherId: [],
      fitnessTeacherId:[],
      satisfaction: ['满意'],
      consumeDate: [],
      settleStatus: [0],
      reserveStatus: [ this.appointmentInfo.reserveStatus ]
    });

    this.timesCountGroup.get('commodityId').valueChanges.subscribe(id => {
      this.http.post('/yeqs/customer/price', { id, cardId: this.timesCountGroup.get('cardId').value }, false).then(res => {
        this.timesCountGroup.patchValue({ consumption: res.result.price });
      })
    });
    this.singleTimeGroup.get('commodityId').valueChanges.subscribe(id => {
      this.commodityList.map(res => res.id === id && this.singleTimeGroup.patchValue({ consumption: res.price }));
    });

    /* ------------------------- 获取服务器时间 ------------------------- */
    this.http.post('/yeqs/customer/getSystemDate', {}, false).then(res => {
      this.timesCountGroup.patchValue({ consumeDate: res.result });
      this.singleTimeGroup.patchValue({ consumeDate: res.result });
    });

    this.http.post('/yeqs/member/getStoreTeachers', {}, false).then(res => this.teacherList = res.result);
    this.http.post('/yeqs/member/communityList', {}, false).then(res => this.communityList = res.result);
    this.http.post('/yeqs/swimRing/getStoreSwimRings', {}, false).then(res => this.swimRingList = res.result);
    this.http.post('/yeqs/memberCard/getMemberCards', { memberId: this.appointmentInfo.memberId }, false).then(res => {
      this.memberCardList = res.result;
      res.result.length && this.timesCountGroup.patchValue({ cardId: res.result[0].id });
    });
    this.http.post('/yeqs/commodity/getCardCommodities', {}, false).then(res => this.commoditieList = res.result);
    this.http.post('/yeqs/commodity/getCommonCommodities', {}, false).then(res => this.commodityList = res.result);
  }                        


  saveLoading: boolean;
  saveDrawer() {
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
        this.http.post('/yeqs/customer/create', { paramJson: JSON.stringify(Object.assign(baseValue, this.timesCountGroup.value)), settleStatus: this.timesCountGroup.value.settleStatus }).then(res => {
          this.drawerRef.close(true);
        }).catch(error => this.saveLoading = false);
      }
    } else {
      if (this.singleTimeGroup.invalid) {
        for (let i in this.singleTimeGroup.controls) {
          this.singleTimeGroup.controls[i].markAsDirty();
          this.singleTimeGroup.controls[i].updateValueAndValidity();
        }
      } else {
        this.saveLoading = true;
        this.http.post('/yeqs/customer/create', { paramJson: JSON.stringify(Object.assign(baseValue, this.singleTimeGroup.value)), settleStatus: this.singleTimeGroup.value.settleStatus }).then(res => {
          this.drawerRef.close(true);
        }).catch( error=>  this.saveLoading = false);
      }
    }
  }
  closeDrawer() {
    this.drawerRef.close(false);
  }

}
