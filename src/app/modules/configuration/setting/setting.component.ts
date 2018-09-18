import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from './../../../ng-relax/services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  businessHoursForm: FormGroup;

  messageSendForm: FormGroup;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder()
  ) { 
    this.businessHoursForm = this.fb.group({
      startHour: [8, [Validators.required]],
      endHour: [18, [Validators.required]],
      teacherSchedule: [false, [Validators.required]]
    });
    this.messageSendForm = this.fb.group({})
  }

  ngOnInit() {
  }

}
