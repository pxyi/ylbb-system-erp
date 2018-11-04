import { DatePipe } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { NzDrawerRef } from 'ng-zorro-antd';
import { DrawerRefClose } from 'src/app/ng-relax/decorators/drawerRefClose.decorator';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer.decorator';

@Component({
  selector: 'app-addapoint',
  templateUrl: './addapoint.component.html',
  styleUrls: ['./addapoint.component.scss']
})
export class AddapointComponent implements OnInit {

  @Input() reserveInit;

  queryForm: FormGroup;

  formGroup: FormGroup;

  swimRingList: any[] = [];
  communityList: any[] = [];
  cardList: any[] = [];

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder,
    private drawerRef: NzDrawerRef<boolean>,
    private format: DatePipe
  ) { 
    /* -------------------- 获取泳圈型号 -------------------- */
    this.http.post('/swimRing/getStoreSwimRings', {}, false).then(res => this.swimRingList = res.result);
    /* -------------------- 获取所有社区 -------------------- */
    this.http.post('/member/communityList', {}, false).then(res => this.communityList = res.result);
  }

  ngOnInit() {
    this.queryForm = this.fb.group({
      mobilePhone: [, [Validators.required, Validators.pattern(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/)]]
    });
    this.formGroup = this.fb.group({
      memberId: [],
      swimTeacherId: [this.reserveInit.swimTeacherId, [Validators.required]],
      reserveDate: [this.reserveInit.reserveDate, [Validators.required]],
      reserveHour: [`${this.reserveInit.reserveDate} ${this.reserveInit.reserveHour}`, [Validators.required]],
      rHour: [this.reserveInit.reserveHour.split(':')[0]],
      rMinute: [this.reserveInit.reserveHour.split(':')[1]],

      name: [, [Validators.required]],
      nick: [],
      sex: [, [Validators.required]],
      monthAge: [, [Validators.required]],
      babyType: [, [Validators.required]],
      communityId: [, [Validators.required]],
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
  }

  queryMember() {
    if (this.queryForm.valid) {
      this.http.post('/homePage/getMemberDetail', this.queryForm.value, false).then(res => {
        this.formGroup.patchValue(res.result);
        if (res.result.havacard) {
          this.http.post('/memberCard/getMemberCards', { memberId: res.result.memberId }, false).then(res => {
            this.cardList = res.result;
            res.result.length && this.formGroup.patchValue({ cardId: res.result[0].id });
          });
        }
      })
    }
  }

  @DrawerRefClose() close: () => void;

  saveLoading: boolean;
  save() {
    if (this.formGroup.invalid) {
      for (let i in this.formGroup.controls) {
        this.formGroup.controls[i].markAsDirty();
        this.formGroup.controls[i].updateValueAndValidity();
      }
    } else {
      this.saveLoading = true;
      this.http.post('/reserve/createReserve', {
        paramJson: JSON.stringify(this.formGroup.value)
      }).then(res => {
        this.saveLoading = false;
        this.drawerRef.close(true);
      }).catch(err => this.saveLoading = false);
    }
  }

  _disabledDate(current: Date): boolean {
    return current && current.getTime() < Date.now() - 24 * 60 * 60 * 1000;
  }
  _disabledHours(): number[] {
    return [0, 1, 2, 3, 4, 5, 6, 7]
  }

}
