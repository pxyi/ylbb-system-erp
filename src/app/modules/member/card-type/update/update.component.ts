import { NzDrawerRef } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from './../../../../ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.less']
})
export class UpdateComponent implements OnInit {

  @Input() cardTypeInfo: any = {};

  formGroup: FormGroup;

  cardBusinessList: any[] = [];

  cardAttribuiteList: any[] = [];

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef
  ) {
    this.http.post('/cardBusinessManagement/findList').then(res => this.cardBusinessList = res.result);
    this.http.post('/cardAttributeController/getList').then(res => this.cardAttribuiteList = res.result);
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      id: [],
      name: [, [Validators.required]],
      categoryId: [, [Validators.required]],
      attributeId: [, [Validators.required]],
      effectMonth: [, [Validators.required]],
      feeType: [, [Validators.required]],
      balance: [, [Validators.required]],
      openPoints: [, [Validators.required]],
      tong: [this.cardTypeInfo.tong || false],
      comment: []
    });
    this.formGroup.controls['attributeId'].valueChanges.subscribe(res => this.attribuiteIdChange(res));

    this.formGroup.patchValue(this.cardTypeInfo)
  }
  attribuiteIdChange(val) {
    if (val == 0) {
      this.formGroup.addControl('times', this.fb.control(this.cardTypeInfo.id ? this.cardTypeInfo.times : null, [Validators.required]));
      this.formGroup.addControl('freeTimes', this.fb.control(this.cardTypeInfo.id ? this.cardTypeInfo.freeTimes : null, [Validators.required]));

      this.formGroup.removeControl('amount');
      this.formGroup.removeControl('freeAmount');
      this.formGroup.removeControl('discount');
    } else {
      this.formGroup.addControl('amount', this.fb.control(this.cardTypeInfo.id ? this.cardTypeInfo.amount : null, [Validators.required]));
      this.formGroup.addControl('freeAmount', this.fb.control(this.cardTypeInfo.id ? this.cardTypeInfo.freeAmount : null, [Validators.required]));
      this.formGroup.addControl('discount', this.fb.control(this.cardTypeInfo.id ? this.cardTypeInfo.discount : null, [Validators.required]));

      this.formGroup.removeControl('times');
      this.formGroup.removeControl('freeTimes');
    }
  }

  saveLoading: boolean;
  @DrawerSave('/cardTypeManagement/modify') save: () => void;
  @DrawerClose() close: () => void;
}
