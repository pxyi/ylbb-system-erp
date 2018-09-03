import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from './../../../../ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { DrawerSave } from '../../../../ng-relax/decorators/drawer.decorator';

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
    private fb: FormBuilder = new FormBuilder()
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

  @DrawerSave('/memberCard/modifyTongCard') save;

}
