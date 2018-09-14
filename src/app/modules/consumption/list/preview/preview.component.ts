import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  @Input() id;

  @Input() recordInfo;

  baseFormGroup: FormGroup;
  timesCountGroup: FormGroup;
  singleTimeGroup: FormGroup;


  teacherList: any[] = [];
  commoditieList: any[] = [];
  swimRingList: any[] = [];

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder()
  ) { 
    this.http.post('/member/getStoreTeachers', {}, false).then(res => this.teacherList = res.result);
    this.http.post('/commodity/getStoreCommodities', {}, false).then(res => this.commoditieList = res.result);
    this.http.post('/swimRing/getStoreSwimRings', {}, false).then(res => this.swimRingList = res.result);
  }

  ngOnInit() {
    this.baseFormGroup = this.fb.group({
      id: [this.id],
      memberId: [this.recordInfo.memberId],
      memberName: [{ value: this.recordInfo.memberName, disabled: true }],
      memberNick: [{ value: this.recordInfo.memberNick, disabled: true }],
      sex: [{ value: this.recordInfo.sex, disabled: true }],
      monthAge: [{ value: this.recordInfo.monthAge, disabled: true }],
      comment: [this.recordInfo.comment]
    });
    this.timesCountGroup = this.fb.group({
      cardCode: [{ value: this.recordInfo.cardCode, disabled: true }],
      commodityName: [{ value: this.recordInfo.commodityName, disabled: true }],
      teacherId: [this.recordInfo.teacherId, [Validators.required]],
      ringId: [this.recordInfo.ringId],
      swimDuration: [this.recordInfo.swimDuration],
      temperaturePost: [this.recordInfo.temperaturePost],
      weight: [this.recordInfo.weight],
      temperature: [this.recordInfo.temperature],
      satisfaction: [{ value: this.recordInfo.satisfaction, disabled: true }],
      consumeDate: [{ value: this.recordInfo.consumeDate, disabled: true }]
    });
    this.singleTimeGroup = this.fb.group({
      commodityName: [{ value: this.recordInfo.commodityName, disabled: true }],
      consumption: [{ value: this.recordInfo.consumption, disabled: true }],
      teacherId: [this.recordInfo.teacherId, [Validators.required]],
      satisfaction: [{ value: this.recordInfo.satisfaction, disabled: true }],
      consumeDate: [{ value: this.recordInfo.consumeDate, disabled: true }]
    })
  }

  save(): Promise<boolean> {
    return new Promise(resolve => {
      resolve(true)
      if (this.recordInfo.commodityType == 0 && this.timesCountGroup.invalid) {
        for (let i in this.timesCountGroup.controls) {
          this.timesCountGroup.controls[i].markAsDirty();
          this.timesCountGroup.controls[i].updateValueAndValidity();
        }
        resolve(false);
      } else if (this.recordInfo.commodityType == 1 && this.singleTimeGroup.invalid) {
        for (let i in this.singleTimeGroup.controls) {
          this.singleTimeGroup.controls[i].markAsDirty();
          this.singleTimeGroup.controls[i].updateValueAndValidity();
        }
        resolve(false);
      } else {
        let params = Object.assign(this.baseFormGroup.value, this.recordInfo.commodityType == 0 ? this.timesCountGroup.value : this.singleTimeGroup.value);
        this.http.post('/customer/updateConsumeRecord', {
          paramJson: JSON.stringify(params)
        }).then(res => resolve(true)).catch(err => resolve(false));
      }
    });
  }

}
