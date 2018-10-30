import { NzDrawerRef } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-warehousing',
  templateUrl: './warehousing.component.html',
  styleUrls: ['./warehousing.component.scss']
})
export class WarehousingComponent implements OnInit {

  @Input() commodityInfo;

  saveLoading: boolean;

  formGroup: FormGroup;

  employeeList: any[] = [];

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef<boolean>
  ) { 
    this.http.post('/member/getStoreTeachers', {}, false).then(res => this.employeeList = res.result);
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: [ {value: this.commodityInfo.name, disabled: true} ],
      stockPrice: [{ value: this.commodityInfo.stockPrice, disabled: true }],
      price: [{ value: this.commodityInfo.price, disabled: true }],
      dqstock: [{ value: this.commodityInfo.stock, disabled: true }],
      totalStock: [{ value: this.commodityInfo.totalStock, disabled: true }],
      introduction: [{ value: this.commodityInfo.introduction, disabled: true }],

      stock: [, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
      employeeId: [, [Validators.required]],
      password: [, [Validators.required]]
    })
  }

  save() {
    if (this.formGroup.invalid) {
      for (let control in this.formGroup.controls) {
        this.formGroup.controls[control].markAsDirty();
        this.formGroup.controls[control].updateValueAndValidity();
      }
    } else {
      this.saveLoading = true;
      this.http.post('/commodity/saveStock', { paramJson: JSON.stringify(this.formGroup.value) }).then(res => {
        this.drawerRef.close(true);
      }).catch(res => this.saveLoading = false);
    }
  }

  close() {
    this.drawerRef.close();
  }

}
