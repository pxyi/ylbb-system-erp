import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';
import { ConsumptionComponent } from './consumption/consumption.component';

@Component({
  selector: 'app-appoint-detail',
  templateUrl: './appoint-detail.component.html',
  styleUrls: ['./appoint-detail.component.less']
})
export class AppointDetailComponent implements OnInit {

  @Input() appointInfo;

  formGroup: FormGroup;
  revokeGroup: FormGroup;

  swimRingList: any[] = [];
  communityList: any[] = [];
  cardList: any[] = [];
  teacherList: any[] = [];

  constructor(
    private http: HttpService,
    private drawerRef: NzDrawerRef,
    private drawer: NzDrawerService,
    private fb: FormBuilder = new FormBuilder(),
    private format: DatePipe
  ) {
    /* -------------------- 获取泳圈型号 -------------------- */
    this.http.post('/swimRing/getStoreSwimRings').then(res => this.swimRingList = res.result);
    /* -------------------- 获取所有社区 -------------------- */
    this.http.post('/member/communityList').then(res => this.communityList = res.result);
    /* -------------------- 获取所有老师 -------------------- */
    this.http.post('/tongka/teacherList').then(res => this.teacherList = res.result);
  }

  ngOnInit() {
    if (this.appointInfo.haveCard) {
      this.http.post('/memberCard/getMemberCards', { memberId: this.appointInfo.memberId }, false).then(res => {
        this.cardList = res.result;
      });
    }
    this.formGroup = this.fb.group({
      id: [],
      memberId: [],
      swimTeacherId: [, [Validators.required]],
      reserveDate: [, [Validators.required]],
      reserveHour: [`${this.appointInfo.reserveDate} ${this.appointInfo.reserveHour}`, [Validators.required]],
      rHour: [this.appointInfo.reserveHour.split(':')[0]],
      rMinute: [this.appointInfo.reserveHour.split(':')[1]],

      name: [, [Validators.required]],
      nick: [],
      sex: [],
      monthAge: [, [Validators.required]],
      babyType: [],
      communityId: [],
      ringId: [],
      cardId: [],
      comment: []
    });
    this.formGroup.get('reserveHour').valueChanges.subscribe(e => {
      if (e) {
        let newHour = this.format.transform(e, 'yyyy-MM-dd HH:mm').split(' ')[1];
        this.formGroup.patchValue({
          rHour: newHour.split(':')[0],
          rMinute: newHour.split(':')[1]
        })
      }
    })
    this.formGroup.patchValue(this.appointInfo);

    this.revokeGroup = this.fb.group({

    })
  }

  @DrawerClose() close: () => void;

  saveLoading: boolean;
  save() {
    if (this.formGroup.invalid) {
      for (let i in this.formGroup.controls) {
        this.formGroup.controls[i].markAsDirty();
        this.formGroup.controls[i].updateValueAndValidity();
      }
    } else {
      this.saveLoading = true;
      this.http.post('/reserve/modity', {
        paramJson: JSON.stringify(this.formGroup.value)
      }).then(res => {
        this.saveLoading = false;
        this.drawerRef.close(true);
      }).catch(err => this.saveLoading = false);
    }
  }

  revokeLoading: boolean;
  revoke() {
    this.revokeLoading = true;
    this.http.post('/reserve/cancel', { id: this.appointInfo.id }).then(res => {
      this.revokeLoading = false;
      this.drawerRef.close(true);
    }).catch(err => this.revokeLoading = true)
  }


  /* ------------- 结算 ------------- */
  consumption() {
    const drawerRef = this.drawer.create({
      nzTitle: '添加消费',
      nzContent: ConsumptionComponent,
      nzWidth: 660,
      nzBodyStyle: {
        'padding-bottom': '53px'
      },
      nzContentParams: {
        appointmentInfo: this.appointInfo
      }
    });
    drawerRef.afterClose.subscribe(res => {
      res && this.drawerRef.close(true);
    })
  }
 

  _disabledDate(current: Date): boolean {
    return current && current.getTime() < Date.now();
  }
  _disabledHours(): number[] {
    return [0, 1, 2, 3, 4, 5, 6, 7]
  }



}
