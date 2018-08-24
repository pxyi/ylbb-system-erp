import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-continued',
  templateUrl: './continued.component.html',
  styleUrls: ['./continued.component.scss']
})
export class ContinuedComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder()
  ) {
    this.formGroup = this.fb.group({
      cardCode: [{ value: null, disabled: true }],
      memberName: [{ value: null, disabled: true }],
      times: [{ value: null, disabled: true }],
      freeTimes: [{ value: null, disabled: true }],
      balance: [{ value: null, disabled: true }],
      expireDate: [{ value: null, disabled: true }],
      changeCardType: [, [Validators.required]]
    })
  }
  ngOnInit() {
  }

}
