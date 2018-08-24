import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder()
  ) {
    this.formGroup = this.fb.group({
      name: [, [Validators.required]],
      nick: [],
      sex: [, [Validators.required]],
      monthAge: [, [Validators.required]],
      babyType: [, [Validators.required]],
      communityId: [, [Validators.required]],
      exchangePoint: [, [Validators.required]],
      exchangeRemark: [, [Validators.required]],
      comment: []
    })
  }

  ngOnInit() {
  }

}
