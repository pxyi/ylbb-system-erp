import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  baseFormGroup: FormGroup;
  timesCountGroup: FormGroup;
  singleTimeGroup: FormGroup;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder()
  ) {
    this.baseFormGroup = this.fb.group({
      name: [{ value: null, disabled: true }, [Validators.required]],
      nick: [{ value: null, disabled: true }],
      sex: [{ value: null, disabled: true }],
      monthAge: [{ value: null, disabled: true }],
      comment: []
    });
    this.timesCountGroup = this.fb.group({
      cardId: [{ value: null, disabled: true }],
      commodityId: [{ value: null, disabled: true }],
      swimTeacherId: [, [Validators.required]],
      ringId: [],
      swimDuration: [],
      temperaturePost: [],
      weight: [],
      temperature: [],
      satisfaction: [{ value: null, disabled: true }],
      consumeDate: [{ value: null, disabled: true }]
    });
    this.singleTimeGroup = this.fb.group({
      commodityId: [{ value: null, disabled: true }],
      consumption: [{ value: null, disabled: true }],
      swimTeacherId: [],
      satisfaction: [{ value: null, disabled: true }],
      consumeDate: [{ value: null, disabled: true }]
    })
  }

  ngOnInit() {
  }

}
