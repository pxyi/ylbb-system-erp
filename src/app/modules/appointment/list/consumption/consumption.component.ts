import { NzDrawerRef } from 'ng-zorro-antd';
import { HttpService } from './../../../../ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.scss']
})
export class ConsumptionComponent implements OnInit {

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
    this.consumptionType = this.appointmentInfo.cardCode ? 0 : 1;

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
      commodityId: [, [Validators.required]],
      consumption: [, [Validators.required]],
      ringId: [],
      swimDuration: [],
      temperaturePost: [],
      weight: [],
      temperature: [],
      satisfaction: ['一般'],
      consumeDate: []
    });
    this.singleTimeGroup = this.fb.group({
      commodityId: [, [Validators.required]],
      consumption: [],
      swimTeacherId: [],
      satisfaction: ['一般'],
      consumeDate: []
    });

    this.timesCountGroup.get('commodityId').valueChanges.subscribe(id => {
      this.http.post('/customer/price', { id, cardId: this.timesCountGroup.get('cardId').value }, false).then(res => {
        this.timesCountGroup.patchValue({ consumption: res.result.price });
      })
    });
    this.singleTimeGroup.get('commodityId').valueChanges.subscribe(id => {
      this.commodityList.map(res => res.id === id && this.singleTimeGroup.patchValue({ consumption: res.price }));
    });

    /* ------------------------- 获取服务器时间 ------------------------- */
    this.http.post('/customer/getSystemDate', {}, false).then(res => {
      this.timesCountGroup.patchValue({ consumeDate: res.result });
      this.singleTimeGroup.patchValue({ consumeDate: res.result });
    });

    this.http.post('/member/getStoreTeachers', {}, false).then(res => this.teacherList = res.result);
    this.http.post('/member/communityList', {}, false).then(res => this.communityList = res.result);
    this.http.post('/swimRing/getStoreSwimRings', {}, false).then(res => this.swimRingList = res.result);
    this.http.post('/memberCard/getMemberCards', { memberId: this.appointmentInfo.memberId }, false).then(res => {
      this.memberCardList = res.result;
      res.result.length && this.timesCountGroup.patchValue({ cardId: res.result[0].id });
    });
    this.http.post('/commodity/getStoreCommodities', {}, false).then(res => this.commoditieList = res.result);
    this.http.post('/commodity/getCommonCommodities', {}, false).then(res => this.commodityList = res.result);
  }


  saveLoading: boolean;
  saveDrawer() {
    let baseValue = {};
    Object.keys(this.baseFormGroup.controls).map(key => {
      baseValue[key] = this.baseFormGroup.controls[key].value;
    })
    if (this.consumptionType === 0) {
      console.log(this.baseFormGroup, this.baseFormGroup.value)
      if (this.timesCountGroup.invalid) {
        for (let i in this.timesCountGroup.controls) {
          this.timesCountGroup.controls[i].markAsDirty();
          this.timesCountGroup.controls[i].updateValueAndValidity();
        }
      } else {
        this.saveLoading = true;
        this.http.post('/customer/create', { paramJson: JSON.stringify(Object.assign(baseValue, this.timesCountGroup.value)) }).then(res => {
          this.drawerRef.close(true);
        });
      }
    } else {
      if (this.singleTimeGroup.invalid) {
        for (let i in this.singleTimeGroup.controls) {
          this.singleTimeGroup.controls[i].markAsDirty();
          this.singleTimeGroup.controls[i].updateValueAndValidity();
        }
      } else {
        this.saveLoading = true;
        this.http.post('/customer/create', { paramJson: JSON.stringify(Object.assign(baseValue, this.singleTimeGroup.value)) }).then(res => {
          this.drawerRef.close(true);
        });
      }
    }
  }
  closeDrawer() {
    this.drawerRef.close(false);
  }

}
