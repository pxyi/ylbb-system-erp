import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-revoke',
  templateUrl: './revoke.component.html',
  styleUrls: ['./revoke.component.scss']
})
export class UpdateRevokeComponent implements OnInit {

  formGroup: FormGroup;
  
  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder()
  ) {
    this.formGroup = this.fb.group({
      name: [{ value: null, disabled: true }],
      nick: [{ value: null, disabled: true }],
      sex: [{ value: null, disabled: true }],
      commodityName: [{ value: null, disabled: true }],
      cardCode: [{ value: null, disabled: true }],
      consumption: [{ value: null, disabled: true }],
      satisfaction: [{ value: null, disabled: true }],
      swimTeacherName: [{ value: null, disabled: true }],
      monthAge: [{ value: null, disabled: true }],
      swimDuration: [{ value: null, disabled: true }],
      swimRingName: [{ value: null, disabled: true }],
      temperaturePost: [{ value: null, disabled: true }],
      weight: [{ value: null, disabled: true }],
      temperature: [{ value: null, disabled: true }],
      comment: [{ value: null, disabled: true }],
      reason: [, [Validators.required]]
    });
  }

  ngOnInit() {
  }

}
