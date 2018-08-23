import { FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.scss']
})
export class ConsumptionComponent implements OnInit, OnDestroy {

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
  ) { 
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
