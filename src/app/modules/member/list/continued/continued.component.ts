import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';
import { NzDrawerRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-continued',
  templateUrl: './continued.component.html',
  styleUrls: ['./continued.component.scss']
})
export class ContinuedComponent implements OnInit {

  @Input() id;

  @Input() memberCardInfo;

  cardTypeList: any[] = [];
  salesList: any[] = [];

  formGroup: FormGroup;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef
  ) {
    this.http.post('/yeqs/cardTypeManagement/findList', {}, false).then(res => this.cardTypeList = res.result);
    this.http.post('/yeqs/member/getStoreSales', {}, false).then(res => this.salesList = res.result);
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      id: [this.id],
      cardCode: [{ value: this.memberCardInfo.cardCode, disabled: true }],
      memberName: [{ value: this.memberCardInfo.memberName, disabled: true }],
      times: [{ value: this.memberCardInfo.times, disabled: true }],
      freeTimes: [{ value: this.memberCardInfo.freeTimes, disabled: true }],
      balance: [{ value: this.memberCardInfo.balance, disabled: true }],
      expireDate: [{ value: this.memberCardInfo.expireDate, disabled: true }],
      changeCardType: [, [Validators.required]],
      salesId: [, [Validators.required]]
    });
  }

  @DrawerClose() close: () => void;
  saveLoading: boolean;
  @DrawerSave('/yeqs/memberCard/continueCard') save: () => void;

}
