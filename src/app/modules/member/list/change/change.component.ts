import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';
import { NzDrawerRef } from 'ng-zorro-antd';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss']
})
export class ChangeComponent implements OnInit {

  @Input() id;
  @Input() memberCardInfo;

  formGroup: FormGroup;

  cardTypeList: any[] = []
  salesList: any[] = [];

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef
  ) {
    this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/cardTypeManagement/findList', {}, false).then(res => this.cardTypeList = res.result);
    this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/member/getStoreSales', {}, false).then(res => this.salesList = res.result);
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      id: [this.id],
      cardCode: [{ value: this.memberCardInfo.cardCode, disabled: true }],
      memberName: [{ value: this.memberCardInfo.name, disabled: true }],
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
      changeCardType: [, [Validators.required]],
      turnCard: [ this.memberCardInfo.turnCard ],
      salesId: [, [Validators.required]],
      comment: []
    })
  }

  @DrawerClose() close: () => void;
  saveLoading: boolean;
  @DrawerSave('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/memberCard/changeCard') save: () => void;

  minimumValueValidator(contrastKey: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let minValue = this.memberCardInfo[contrastKey];
      return minValue + Number(control.value) < 0 ? { minValue: true } : null;
    };
  }

}
