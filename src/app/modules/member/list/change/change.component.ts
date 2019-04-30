import { NzDrawerRef } from 'ng-zorro-antd';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.less']
})
export class ChangeComponent implements OnInit {

  @Input() id;
  @Input() memberCardInfo;

  formGroup: FormGroup;

  cardTypeList: any[] = [];
  employeeList: any[] = [];

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef
  ) {
    this.http.post('/employee/listEmployee').then(res => this.employeeList = res.result);
  }

  ngOnInit() {
    this.http.post('/cardTypeManagement/findList', { type: this.memberCardInfo.type }, false).then(res => this.cardTypeList = res.result);

    this.formGroup = this.fb.group({
      id: [this.id],
      cardCode: [{ value: this.memberCardInfo.cardCode, disabled: true }],
      name: [{ value: this.memberCardInfo.name, disabled: true }],
      times: [{ value: this.memberCardInfo.times, disabled: true }],
      freeTimes: [{ value: this.memberCardInfo.freeTimes, disabled: true }],
      amount: [{ value: this.memberCardInfo.amount, disabled: true }],
      freeAmount: [{ value: this.memberCardInfo.freeAmount, disabled: true }],
      balance: [{ value: this.memberCardInfo.balance, disabled: true }],
      expireDate: [{ value: this.memberCardInfo.expireDate, disabled: true }],
      changeExpireDate: [this.memberCardInfo.expireDate],
      cardTypeName: [{ value: this.memberCardInfo.ctName, disabled: true }],
      cardType: [this.memberCardInfo.cardTypeId],
      type: [this.memberCardInfo.type],
      changeCardType: [],
      employeeId: [, [Validators.required]],
      turnCard: [this.memberCardInfo.turnCard],
      comment: []
    });
    this.formGroup.controls.type.valueChanges.subscribe(val => this.formGroupTypeChange(val))
    this.formGroupTypeChange(this.formGroup.controls.type.value);
  }

  formGroupTypeChange(val) {
    this.formGroup.removeControl('changeBalance');
    if (val == 1) {
      this.formGroup.addControl('changeBalance', this.fb.control(null, [Validators.required, Validators.pattern(/^\-?[0-9]+(\.\d{1,2})?$/), this.minimumValueValidator('amount')]))
      this.formGroup.addControl('changeAmount', this.fb.control(null, [Validators.required, Validators.pattern(/^\-?[0-9]+(\.\d{1,2})?$/), this.minimumValueValidator('amount')]))
      this.formGroup.addControl('changeFreeAmount', this.fb.control(null, [Validators.required, Validators.pattern(/^\-?[0-9]+(\.\d{1,2})?$/), this.minimumValueValidator('freeAmount')]))

      this.formGroup.removeControl('changeTimes');
      this.formGroup.removeControl('changeFreeTimes');
    } else {
      this.formGroup.addControl('changeBalance', this.fb.control(null, [Validators.pattern(/^\-?[0-9]+(\.\d{1,2})?$/), this.minimumValueValidator('amount')]))
      this.formGroup.addControl('changeTimes', this.fb.control(null, [Validators.pattern(/^-?[1-9]\d*$/), this.minimumValueValidator('times')]));
      this.formGroup.addControl('changeFreeTimes', this.fb.control(null, [Validators.pattern(/^-?[1-9]\d*$/), this.minimumValueValidator('freeTimes')]));

      this.formGroup.removeControl('changeAmount');
      this.formGroup.removeControl('changeFreeAmount');
    }
  }

  saveLoading:boolean;
  save() {
    if (this.formGroup.invalid) {
      for (let i in this.formGroup.controls) {
        this.formGroup.controls[i].markAsDirty();
        this.formGroup.controls[i].updateValueAndValidity();
      }
    } else {
      this.http.post(this.memberCardInfo.type == 0 ? '/memberCard/changeCard' : '/memberCard/changeValueCard', {
        paramJson: JSON.stringify(this.formGroup.value)
      }, true).then(res => this.drawerRef.close(true));
    }
  }

  @DrawerClose() close: () => void;
  

  minimumValueValidator(contrastKey: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let minValue = this.memberCardInfo[contrastKey];
      return minValue + Number(control.value) < 0 ? { minValue: true } : null;
    };
  }

}
