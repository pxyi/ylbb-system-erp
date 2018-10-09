import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { DrawerSave } from '../../../../ng-relax/decorators/drawer.decorator';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss']
})
export class ChangeComponent implements OnInit {

  @Input() id;
  @Input() memberCardInfo;

  formGroup: FormGroup;

  cardTypeList: any[] = [];

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder()
  ) {
    this.http.post('/cardTypeManagement/findList', {}, false).then(res => this.cardTypeList = res.result);
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      id: [this.id],
      cardCode: [{ value: this.memberCardInfo.cardCode, disabled: true }],
      memberName: [{ value: this.memberCardInfo.memberName, disabled: true }],
      times: [{ value: this.memberCardInfo.times, disabled: true }],
      changeTimes: [, [Validators.pattern(/^-?[1-9]\d*$/), this.minimumValueValidator('times')]],
      freeTimes: [{ value: this.memberCardInfo.freeTimes, disabled: true }],
      changeFreeTimes: [, [Validators.pattern(/^-?[1-9]\d*$/), this.minimumValueValidator('freeTimes')]],
      balance: [{ value: this.memberCardInfo.balance, disabled: true }],
      changeBalance: [, [Validators.pattern(/^\-?[0-9]+(\.\d{1,2})?$/), this.minimumValueValidator('balance')]],
      expireDate: [{ value: this.memberCardInfo.expireDate, disabled: true }],
      changeExpireDate: [this.memberCardInfo.expireDate],
      cardTypeName: [{ value: this.memberCardInfo.ctName, disabled: true }],
      cardType: [ this.memberCardInfo.cardTypeId ],
      changeCardType: [],
      turnCard: [ this.memberCardInfo.turnCard ],
      comment: []
    })
  }

  @DrawerSave('/memberCard/changeCard') save: () => Promise<boolean>;

  minimumValueValidator(contrastKey: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let minValue = this.memberCardInfo[contrastKey];
      return minValue + Number(control.value) < 0 ? { minValue: true } : null;
    };
  }

}
