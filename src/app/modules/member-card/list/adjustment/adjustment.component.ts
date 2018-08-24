import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from './../../../../ng-relax/services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adjustment',
  templateUrl: './adjustment.component.html',
  styleUrls: ['./adjustment.component.scss']
})
export class AdjustmentComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private  http: HttpService,
    private fb: FormBuilder = new FormBuilder()
  ) { 
    this.formGroup = this.fb.group({
      cardCode: [{ value: null, disabled: true }],
      cardTypeName: [{ value: null, disabled: true }],
      memberName: [{ value: null, disabled: true }],
      times: [{ value: null, disabled: true }],
      freeTimes: [{ value: null, disabled: true }],
      balance: [{ value: null, disabled: true }],
      expireDate: [{ value: null, disabled: true }],
      changeBalance: [, [Validators.required]]
    })
  }

  ngOnInit() {
  }

}
