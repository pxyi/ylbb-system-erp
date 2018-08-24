import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.scss']
})
export class ConsumptionComponent implements OnInit, OnDestroy {

  baseFormGroup: FormGroup;
  timesCountGroup: FormGroup;
  singleTimeGroup: FormGroup;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
  ) { 
    this.baseFormGroup = this.fb.group({
      name: [{value: null, disabled: true}, [Validators.required]],
      nick: [{value: null, disabled: true}],
      sex: [{ value: null, disabled: true }],
      monthAge: [{ value: null, disabled: true }],
      comment: []
    });
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

    })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
