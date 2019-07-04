import { NzDrawerRef } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';

@Component({
  selector: 'app-appoint',
  templateUrl: './appoint.component.html',
  styleUrls: ['./appoint.component.less']
})
export class AppointComponent implements OnInit {

  @Input() id;

  @Input() userInfo;

  formGroup: FormGroup;

  communityList: any[] = [];
  cardList: any[] = [];
  teacherList: any[] = [];
  swimRingList: any[] = [];

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private format: DatePipe,
    private drawerRef: NzDrawerRef
  ) {
  }

  ngOnInit() {
    this.userInfo.comment = null;
    this.formGroup = this.fb.group({
      memberId: [this.id],
      name: [this.userInfo.name, [Validators.required]],
      nick: [this.userInfo.nick],
      sex: [this.userInfo.sex, [Validators.required]],
      monthAge: [this.userInfo.monthAge, [Validators.required]],
      babyType: [this.userInfo.babyType, [Validators.required]],
      communityId: [this.userInfo.communityId, [Validators.required]],
      cardId: [],
      spec: [0],
      reserveDate: [, [Validators.required]],
      reserveHour: [, [Validators.required]],
      rHour: [],
      rMinute: [],
      swimTeacherId: [, [Validators.required]],
      ringId: [],
      comment: []
    });
    this.formGroup.patchValue(this.userInfo);
    this.http.post('/yeqs/member/communityList').then(res => this.communityList = res.result);
    this.http.post('/yeqs/memberCard/getMemberCards', { memberId: this.userInfo.memberId || this.id }, false).then(res => {
      this.cardList = res.result;
      res.result.length && this.formGroup.patchValue({ cardId: res.result[0].id });
    });

    /* ------------------ 获取泳师列表 并默认选择第一条数据：到店安排 ------------------ */
    this.http.post('/tongka/teacherList').then(res => {
      this.teacherList = res.result;
      this.formGroup.patchValue({ swimTeacherId: res.result[0].id });
    });
    this.http.post('/swimRing/getStoreSwimRings').then(res => this.swimRingList = res.result);

    /* ------------------ 监听预约时间段变化 ------------------ */
    this.formGroup.get('reserveHour').valueChanges.subscribe(e => {
      if (e) {
        let newHour = this.format.transform(e, 'yyyy-MM-dd HH:mm').split(' ')[1];
        this.formGroup.patchValue({
          rHour: newHour.split(':')[0],
          rMinute: newHour.split(':')[1]
        })
      }
    })
    /* ------------------ 获取当前系统的预约时间 ------------------ */
    this.http.post('/reserve/getResetveDate').then(res => this.formGroup.patchValue({
      reserveHour: new Date(res.result),
      reserveDate: new Date(res.result)
    }));
  }

  @DrawerClose() close: () => void;

  saveLoading: boolean;
  @DrawerSave('/reserve/createReserve') save: () => void;
  


  _disabledDate(current: Date): boolean {
    return current && current.getTime() <= Date.now() - 24 * 60 * 60 * 1000;
  }
  _disabledHours(): number[] {
    return [0, 1, 2, 3, 4, 5, 6, 7]
  }

}
