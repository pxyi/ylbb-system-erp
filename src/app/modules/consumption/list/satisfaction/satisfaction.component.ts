import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-satisfaction',
  templateUrl: './satisfaction.component.html',
  styleUrls: ['./satisfaction.component.scss']
})
export class UpdateSatisfactionComponent implements OnInit {

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
      birthday: [{ value: null, disabled: true }],
      comment: [{ value: null, disabled: true }],
      newSatisfaction: []
    })
  }

  ngOnInit() {
  }

}
