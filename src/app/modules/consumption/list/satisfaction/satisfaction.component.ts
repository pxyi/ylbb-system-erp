import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { DrawerSave } from '../../../../ng-relax/decorators/drawer.decorator';

@Component({
  selector: 'app-satisfaction',
  templateUrl: './satisfaction.component.html',
  styleUrls: ['./satisfaction.component.scss']
})
export class UpdateSatisfactionComponent implements OnInit {

  @Input() id;

  @Input() recordInfo;

  formGroup: FormGroup;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder()
  ) { 
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      id: [this.id],
      memberName: [{ value: this.recordInfo.memberName, disabled: true }],
      memberNick: [{ value: this.recordInfo.memberNick, disabled: true }],
      sex: [{ value: this.recordInfo.sex, disabled: true }],
      commodityName: [{ value: this.recordInfo.commodityName, disabled: true }],
      cardCode: [{ value: this.recordInfo.cardCode, disabled: true }],
      consumption: [{ value: this.recordInfo.consumption, disabled: true }],
      oldSatisfaction: [{ value: this.recordInfo.satisfaction, disabled: true }],
      swimTeacher: [{ value: this.recordInfo.swimTeacher, disabled: true }],
      consumeDate: [{ value: this.recordInfo.consumeDate, disabled: true }],
      comment: [{ value: this.recordInfo.comment, disabled: true }],
      satisfaction: [this.recordInfo.satisfaction]
    });
  }

  @DrawerSave('/customer/modifySat') save: () => Promise<boolean>;

}
