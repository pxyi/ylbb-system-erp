import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-byday',
  templateUrl: './byday.component.html',
  styleUrls: ['./byday.component.scss']
})
export class BydayComponent implements OnInit {

  dataSet: any[] = [];
  thead: any[] = [];
  theadType: any[] = [];
  loading: boolean;

  formGroup: FormGroup;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder()
  ) { 
    this.formGroup = this.fb.group({
      id: [],
      type: [],
      typeString: [],
      weekDay: [],
      configDate: [],
      hourPeriod: [],
      minutePeriod: [],
      occupiedNum: [],
      reserveNum: [],
      surplusNum: [, [Validators.required, Validators.pattern(/^([1-9]\d*|[0]{1,1})$/)]],
    })
  }

  ngOnInit() {
    this.getData();
  }
  
  getData(params = {}) {
    this.loading = true;
    this.http.post('/reserveDayConfig/list', { paramJson: JSON.stringify(params) }, false).then(res => {
      this.dataSet = res.result.list;
      this.thead = res.result.date;
      this.theadType = new Array(res.result.date.length * 2);
      this.loading = false;
    });
  }

  /* ------------------------ 门店休息 ------------------------ */
  rest(day) {
    this.http.post('/reserveDayConfig/remove', { day }).then(res => this.getData());
  }

  showDrawer: boolean;
  getBydayLoading: boolean;
  showBydayInfo(day, hour, minute, type) {
    this.showDrawer = true;
    this.getBydayLoading = true;
    this.http.post('/reserveDayConfig/edit', { paramJson: JSON.stringify({ day, hour, minute, type }) }, false).then(res => {
      this.getBydayLoading = false;
      res.result.typeString = res.result.type == 0 ? '婴儿' : '幼儿';
      this.formGroup.patchValue(res.result);
    })
  }
  saveLoading: boolean;
  saveDrawer() {
    if (this.formGroup.invalid) {
      for (let i in this.formGroup.controls) {
        this.formGroup.controls[i].markAsDirty();
        this.formGroup.controls[i].updateValueAndValidity();
      }
    } else {
      this.saveLoading = true;
      this.http.post('/reserveDayConfig/save', { paramJson: JSON.stringify(this.formGroup.value) }).then(res => {
        this.saveLoading = false;
        this.showDrawer = false;
        this.getData();
      }).catch(err => this.saveLoading = false);
    }
  }
 
}
