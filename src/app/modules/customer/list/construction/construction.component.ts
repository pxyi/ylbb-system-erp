import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-construction',
  templateUrl: './construction.component.html',
  styleUrls: ['./construction.component.scss']
})
export class ConstructionComponent implements OnInit {

  formGroup: FormGroup

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder()
  ) { 
    this.formGroup = this.fb.group({
      cardType: [, [Validators.required]],
      memberName: [{ value: null, disabled: true}],
      times: [{ value: null, disabled: true }],
      freeTimes: [{ value: null, disabled: true }],
      usedTimes: [{ value: null, disabled: true }],
      balance: [{ value: null, disabled: true }],
      openPoints: [{ value: null, disabled: true }],
      effectDate: [{ value: null, disabled: true }],
      expireDate: [{ value: null, disabled: true }],
      turnCard: [],
      comment: []
    })
  }

  ngOnInit() {
  }

}
