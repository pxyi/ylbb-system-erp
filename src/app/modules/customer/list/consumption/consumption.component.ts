import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.scss']
})
export class ConsumptionComponent implements OnInit, OnDestroy {

  @Input() id;

  @Input() userInfo;

  baseFormGroup: FormGroup;
  timesCountGroup: FormGroup;
  singleTimeGroup: FormGroup;

  consumptionType: number = 0;

  memberCardList: any[] = [];
  teacherList: any[] = [];

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
  ) { 
    this.timesCountGroup = this.fb.group({
      cardId: [, [Validators.required]],
      swimTeacherId: [, [Validators.required]],
      commodityId: [, [Validators.required]],
      consumption: [{value: null, disabled: true}, [Validators.required]],
      ringId: [],
      swimDuration: [],
      temperaturePost: [],
      weight: [],
      temperature: [],
      satisfaction: [],
      consumeDate: [{value: null, disabled: true}]
    });
    this.singleTimeGroup = this.fb.group({
      commodityId: [, [Validators.required]],
      consumption: [],
      swimTeacherId: [],
      satisfaction: [],
      consumeDate: [{value: null, disabled: true}]
    })
  }

  ngOnInit() {
    /* -------------------- 根据有无会员卡选择消费方式 -------------------- */
    this.consumptionType = this.userInfo.memberCard ? 0 : 1;
    
    this.baseFormGroup = this.fb.group({
      name: [{ value: this.userInfo.name, disabled: true }],
      nick: [{ value: this.userInfo.nick, disabled: true }],
      sex: [{ value: this.userInfo.sex, disabled: true }],
      monthAge: [{ value: this.userInfo.monthAge, disabled: true }],
      comment: []
    });
    
    /* -------------------- 获取该会员下所有会员卡 及 该店下所有服务泳师 -------------------- */
    this.http.post('/memberCard/getMemberCards', { memberId: this.id }, false).then(res => this.memberCardList = res.result);
    this.http.post('/tongka/teacherList', {}, false).then(res => this.teacherList = res.result);
  }

  ngOnDestroy() {
  }

}
