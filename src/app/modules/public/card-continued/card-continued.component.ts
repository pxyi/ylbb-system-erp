import { NzDrawerRef } from 'ng-zorro-antd';
import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';

@Component({
  selector: 'app-card-continued',
  templateUrl: './card-continued.component.html',
  styleUrls: ['./card-continued.component.less']
})
export class CardContinuedComponent implements OnInit {

  @Input() id;

  @Input() memberCardInfo;

  cardTypeList: any[] = [];
  employeeList: any[] = [];

  formGroup: FormGroup;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef
  ) {
    this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/employee/listEmployee').then(res => this.employeeList = res.result);
  }

  ngOnInit() {
    this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/cardTypeManagement/findList', {type: this.memberCardInfo.type}, false).then(res => this.cardTypeList = res.result);
    this.formGroup = this.fb.group({
      id: [this.id],
      cardCode: [{ value: this.memberCardInfo.cardCode, disabled: true }],
      name: [{ value: this.memberCardInfo.name, disabled: true }],
      times: [{ value: this.memberCardInfo.times, disabled: true }],
      freeTimes: [{ value: this.memberCardInfo.freeTimes, disabled: true }],
      balance: [{ value: this.memberCardInfo.balance, disabled: true }],
      expireDate: [{ value: this.memberCardInfo.expireDate, disabled: true }],
      type: [{ value: this.memberCardInfo.type, disabled: true }],
      changeCardType: [, [Validators.required]],
      employeeId:  [, [Validators.required]]
    });

    if (this.memberCardInfo.type == 1) {
      this.formGroup.addControl('amount', this.fb.control(null, [Validators.required]));
      this.formGroup.addControl('freeAmount', this.fb.control(null, [Validators.required]));
      this.formGroup.addControl('discount', this.fb.control(null, [Validators.required]));

      this.formGroup.controls.changeCardType.valueChanges.subscribe(id => {
        this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/cardTypeManagement/getCardType', { id }, false).then(res => {
          this.formGroup.patchValue({ amount: res.result.amount });
          this.formGroup.patchValue({ freeAmount: res.result.freeAmount });
          this.formGroup.patchValue({ discount: res.result.discount });
        })
      });
    }
  }
  saveLoading: boolean;
  @DrawerSave('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/memberCard/continueCard') save: () => void;

  @DrawerClose() close: () => void;


}
