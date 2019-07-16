import { NzDrawerRef } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-revoke',
  templateUrl: './revoke.component.html',
  styleUrls: ['./revoke.component.less']
})
export class RevokeComponent implements OnInit {

  @Input() id;

  @Input() recordInfo;

  formGroup: FormGroup;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      id: [this.recordInfo.id],
      memberName: [{ value: this.recordInfo.memberName, disabled: true }],
      memberNick: [{ value: this.recordInfo.memberNick, disabled: true }],
      sex: [{ value: this.recordInfo.sex, disabled: true }],
      commodityName: [{ value: this.recordInfo.commodityName, disabled: true }],
      cardCode: [{ value: this.recordInfo.cardCode, disabled: true }],
      consumption: [{ value: this.recordInfo.consumption, disabled: true }],
      satisfaction: [{ value: this.recordInfo.satisfaction, disabled: true }],
      swimTeacher: [{ value: this.recordInfo.swimTeacher, disabled: true }],
      consumeDate: [{ value: this.recordInfo.consumeDate, disabled: true }],
      monthAge: [{ value: this.recordInfo.monthAge, disabled: true }],
      swimDuration: [{ value: this.recordInfo.swimDuration, disabled: true }],
      swimName: [{ value: this.recordInfo.swimName, disabled: true }],
      temperaturePost: [{ value: this.recordInfo.temperaturePost, disabled: true }],
      weight: [{ value: this.recordInfo.weight, disabled: true }],
      temperature: [{ value: this.recordInfo.temperature, disabled: true }],
      comment: [{ value: this.recordInfo.comment, disabled: true }],
      reason: [, [Validators.required]]
    });
  }

  saveLoading: boolean;
  @DrawerSave('/customer/revocationConsume') save: () => void;
  @DrawerClose() close: () => void;

}
