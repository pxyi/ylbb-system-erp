import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DrawerSave } from '../../../../ng-relax/decorators/drawer.decorator';

@Component({
  selector: 'app-continued',
  templateUrl: './continued.component.html',
  styleUrls: ['./continued.component.scss']
})
export class ContinuedComponent implements OnInit {

  @Input() id;

  @Input() memberCardInfo;

  cardTypeList: any[] = [];

  formGroup: FormGroup;

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
      freeTimes: [{ value: this.memberCardInfo.freeTimes, disabled: true }],
      balance: [{ value: this.memberCardInfo.balance, disabled: true }],
      expireDate: [{ value: this.memberCardInfo.expireDate, disabled: true }],
      changeCardType: [, [Validators.required]]
    });
  }

  @DrawerSave('/memberCard/continueCard') save: any;

}
