import { NzMessageService, NzDrawerRef } from 'ng-zorro-antd';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { ControlValid } from 'src/app/ng-relax/decorators/form/valid.decorator';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less']
})
export class CardComponent implements OnInit {

  @Input() consumptionInfo: any = {};

  formGroup: FormGroup;

  /* 会员卡 */
  memberCardList: any[] = [];
  /* 服务泳师 */
  teacherList: any[] = [];
  /* 泳圈 */
  swimRingList: any[] = [];
  /* 消费服务 */
  commoditieList: any[] = [];

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private message: NzMessageService,
    private drawerRef: NzDrawerRef
  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      reserveId: [this.consumptionInfo.reserveDate ? this.consumptionInfo.id : null],
      memberId: [this.consumptionInfo.memberId || this.consumptionInfo.id],
      name: [this.consumptionInfo.name],
      nick: [this.consumptionInfo.nick],
      sex: [this.consumptionInfo.sex],
      monthAge: [this.consumptionInfo.monthAge],

      cardId: [, [Validators.required]],
      swimTeacherId: [this.consumptionInfo.swimTeacherId, [Validators.required]],
      commodityId: [, [Validators.required]],
      consumption: [, [Validators.required]],
      ringId: [],
      swimDuration: [],
      temperaturePost: [],
      weight: [],
      temperature: [],
      satisfaction: ['一般'],
      consumeDate: [{ value: null, disabled: true }]
    });
    /* ------------------------- 消费服务、商品改变自动填写消费金额 ------------------------- */
    this.formGroup.get('commodityId').valueChanges.subscribe(id => {
      this.http.post('/customer/price', { id, cardId: this.formGroup.get('cardId').value }, false).then(res => {
        this.formGroup.patchValue({ consumption: res.result.price });
      })
    });


    /* ------------------------- 消费卡改变触发消费服务列表刷新 ------------------------- */
    this.formGroup.get('cardId').valueChanges.subscribe(cardId => {
      this.formGroup.patchValue({ commodityId: null, consumption: null });
      this.http.post('/customer/changeCommodity', { cardId }, false).then(res => {
        this.commoditieList = res.result;
        this.formGroup.patchValue({ commodityId: res.result[0].id });
      });
    });


    /* ------------------------- 获取服务器时间 ------------------------- */
    this.http.post('/customer/getSystemDate').then(res => this.formGroup.patchValue({ consumeDate: res.result }));

    /* -------------------- 获取下拉列表数据 -------------------- */
    this.http.post('/member/getStoreTeachers').then(res => {
      this.teacherList = res.result;
      this.formGroup.patchValue({ swimTeacherId: res.result[0].id });
    });

    /* -------------------- 如果有会员卡则去请求 会员卡列表和泳圈型号 -------------------- */
    if (this.consumptionInfo.haveCard || this.consumptionInfo.cardCode) {
      this.http.post('/memberCard/getMemberCards', { memberId: this.consumptionInfo.memberId || this.consumptionInfo.id }, false).then(res => {
        this.memberCardList = res.result;
        if (res.result.length) {
          this.formGroup.patchValue({ cardId: res.result[0].id });
          this.http.post('/swimRing/getStoreSwimRings').then(res => this.swimRingList = res.result);
        } else {
          /**
           * @throws 会员卡过期，需要当做无卡处理
           */
          this.message.error('该客户会员卡(停卡，或过期，或卡次用尽)无法使用，请使用单次消费', { nzDuration: 5000 });
        }
      });
    }
  }

  @ControlValid() valid: (key: string, type?: string) => boolean;

  @DrawerClose() close: (bool?) => void;
  saveLoading: boolean;

  save() {
    if (this.formGroup.invalid) {
      Object.keys(this.formGroup.controls).map(key => { this.formGroup.controls[key].markAsDirty(); this.formGroup.controls[key].updateValueAndValidity(); });
    } else {
      this.saveLoading = true;
      this.http.post('/customer/create', { paramJson: JSON.stringify(this.formGroup.value) }, true).then(res => {
        this.saveLoading = false;
        res.code == 1000 && this.close(true);
        /**
         * @throws 需要做消费成功剩余卡次提醒
         */
      })
    }
  }

}
