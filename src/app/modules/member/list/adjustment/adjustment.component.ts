import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { NzDrawerRef } from 'ng-zorro-antd';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';

@Component({
  selector: 'app-adjustment',
  templateUrl: './adjustment.component.html',
  styleUrls: ['./adjustment.component.scss']
})
export class AdjustmentComponent implements OnInit {

  @Input() id;

  @Input() memberCardInfo;

  formGroup: FormGroup;

  constructor(
    private  http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef
  ) { 
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      id: [this.id],
      cardCode: [{ value: this.memberCardInfo.cardCode, disabled: true }],
      cardTypeName: [{ value: this.memberCardInfo.ctName, disabled: true }],
      memberName: [{ value: this.memberCardInfo.memberName, disabled: true }],
      times: [{ value: this.memberCardInfo.times, disabled: true }],
      freeTimes: [{ value: this.memberCardInfo.freeTimes, disabled: true }],
      balance: [{ value: this.memberCardInfo.balance, disabled: true }],
      expireDate: [{ value: this.memberCardInfo.expireDate, disabled: true }],
      tongNum: [, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]]
    })
  }

  @DrawerClose() close: () => void;
  saveLoading: boolean;
  @DrawerSave('/yeqs/memberCard/modifyTongCard') save: () => void;

}
