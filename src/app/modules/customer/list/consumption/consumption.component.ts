import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.scss']
})
export class ConsumptionComponent implements OnInit, OnDestroy {

  @Input() id;

  @Input() userInfo;

  baseFormGroup: FormGroup;
  timesCountGroup: FormGroup;
  singleTimeGroup: FormGroup;

  consumptionType: number = 0;

  teacherList: any[] = [];
  communityList: any[] = [];
  swimRingList: any[] = [];
  memberCardList: any[] = [];
  commoditieList: any[] = [];
  commodityList: any[] = [];

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
  ) { 
  }

  ngOnInit() {
    /* -------------------- 根据有无会员卡选择消费方式 -------------------- */
    this.consumptionType = this.userInfo.memberCard ? 0 : 1;
    
    this.baseFormGroup = this.fb.group({
      memberId: [this.id],
      name: [{ value: this.userInfo.name, disabled: true }],
      nick: [{ value: this.userInfo.nick, disabled: true }],
      sex: [{ value: this.userInfo.sex, disabled: true }],
      monthAge: [{ value: this.userInfo.monthAge, disabled: true }],
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
      satisfaction: [, [Validators.required]],
      consumeDate: [{ value: null, disabled: true }]
    });
    this.singleTimeGroup = this.fb.group({
      commodityId: [, [Validators.required]],
      consumption: [, [Validators.required]],
      swimTeacherId: [, [Validators.required]],
      satisfaction: [, [Validators.required]],
      consumeDate: [{ value: null, disabled: true }]
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
    
    /* -------------------- 获取下拉列表数据 -------------------- */
    this.http.post('/member/getStoreTeachers', {}, false).then(res => this.teacherList = res.result);
    this.http.post('/member/communityList', {}, false).then(res => this.communityList = res.result);
    this.http.post('/swimRing/getStoreSwimRings', {}, false).then(res => this.swimRingList = res.result);
    this.http.post('/memberCard/getMemberCards', { memberId: this.id }, false).then(res => {
      this.memberCardList = res.result;
      res.result.length && this.timesCountGroup.patchValue({ cardId: res.result[0].id });
    });
    this.http.post('/commodity/getStoreCommodities', {}, false).then(res => this.commoditieList = res.result);
    this.http.post('/commodity/getCommonCommodities', {}, false).then(res => this.commodityList = res.result);
  }

  ngOnDestroy() {
  }

  saveLoading: boolean;
  save(): Promise<boolean> {
    return new Promise( resolve => {
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
          resolve(false)
        } else {
          this.saveLoading = true;
          this.http.post('/customer/create', { paramJson: JSON.stringify(Object.assign(baseValue, this.timesCountGroup.value)) }).then(res => {
            resolve(true)
          }).catch(err => resolve(false))
        }
      } else {
        if (this.singleTimeGroup.invalid) {
          for (let i in this.singleTimeGroup.controls) {
            this.singleTimeGroup.controls[i].markAsDirty();
            this.singleTimeGroup.controls[i].updateValueAndValidity();
          }
          resolve(false)
        } else {
          this.saveLoading = true;
          this.http.post('/customer/create', { paramJson: JSON.stringify(Object.assign(baseValue, this.singleTimeGroup.value)) }).then(res => {
            resolve(true)
          }).catch(err => resolve(false))
        }
      }
    })
  }

}
