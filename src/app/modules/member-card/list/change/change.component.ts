import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss']
})
export class ChangeComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder()
  ) {
    this.formGroup = this.fb.group({
      cardCode: [{ value: null, disabled: true }],
      memberName: [{ value: null, disabled: true }],
      times: [{ value: null, disabled: true }],
      changeTimes: [, [Validators.required]],
      freeTimes: [{ value: null, disabled: true }],
      changeFreeTimes: [, [Validators.required]],
      balance: [{ value: null, disabled: true }],
      changeBalance: [, [Validators.required]],
      expireDate: [{ value: null, disabled: true }],
      changeExpireDate: [, [Validators.required]],
      cardTypeName: [{ value: null, disabled: true }],
      changeCardType: [, [Validators.required]],
      turnCard: [],
      comment: []
    })
  }

  ngOnInit() {
  }

}
