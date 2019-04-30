import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/ng-relax/services/http.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.less']
})
export class BaseComponent implements OnInit {

  businessHoursForm: FormGroup;
  businessLoading: boolean = true;

  messageSendForm: FormGroup;
  messageLoading: boolean = true;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder()
  ) {
    /* ------------------------ 获取营业时间配置并初始化 ------------------------*/
    this.businessHoursForm = this.fb.group({
      id: [],
      startHour: [8, [Validators.required]],
      endHour: [18, [Validators.required]],
      teacherSchedule: [false, [Validators.required]]
    });
    this.http.post('/storeHoursConfig/getStoreHours').then(res => {
      this.businessLoading = false;
      res.result.teacherSchedule = res.result.teacherSchedule == 0;
      this.businessHoursForm.patchValue(res.result)
    });

    this.messageSendForm = this.fb.group({
      id: [],
      consumeSms: [false],
      consumeMsg: [false],
      reserveSms: [false],
      reserveMsg: [false],
      birthdaySms: [false],
      birthdayMsg: [false],
      openCardSms: [false],
      openCardMsg: [false],
      expireCardSms: [false],
      expireCardMsg: [false],
      monthReachSms: [false],
      monthReachMsg: [false]
    });
    this.http.post('/storeMessageConfig/getStoreMessage').then(res => {
      this.messageLoading = false;
      this.messageSendForm.patchValue(res.result);
    })
  }

  ngOnInit() {
  }

  saveBusiness() {
    let params = this.businessHoursForm.value;
    params.teacherSchedule = this.businessHoursForm.value.teacherSchedule ? 0 : 1;
    this.http.post('/storeHoursConfig/saveStoreHours', { paramJson: JSON.stringify(params) }, true).then(res => { })
  }

  saveMessage() {
    this.http.post('/storeMessageConfig/saveStoreMessage', { paramJson: JSON.stringify(this.messageSendForm.value) }, true).then(res => { })
  }

}
