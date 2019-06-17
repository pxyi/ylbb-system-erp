import { FormBuilder, FormGroup, Validators, FormArray, ValidatorFn, AbstractControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/ng-relax/services/http.service';

@Component({
  selector: 'app-excitation',
  templateUrl: './excitation.component.html',
  styleUrls: ['./excitation.component.less']
})
export class ExcitationComponent implements OnInit {

  @Input() expectTotalIncome: number;

  @Output() next: EventEmitter<number> = new EventEmitter();

  formGroup: FormGroup;

  excitationFormGroup: FormGroup;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder()
  ) {
    this.formGroup = this.fb.group({
      settleType1: [2],
      settleType2: [2],
      settleType3: [2],
      settleType4: [2],
      settleType5: [2],
      commissionConfigList: this.fb.array([]),
      managerCardList: this.fb.array([]),
      saleCardList: this.fb.array([]),
      directorCardList: this.fb.array([]),
      teacherCardList: this.fb.array([]),
    });
    this.excitationFormGroup = this.fb.group({
      roleList: [, [Validators.required]],
      integralConversion: [, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      level1: this.fb.array([]),
      level2: this.fb.array([]),
      level3: this.fb.array([]),
      serviceConfig: this.fb.array([]),
      clueConfig: this.fb.array([]),
      practiceConfig: this.fb.array([]),
      otherConfig: this.fb.array([]),
    });


  }

  ngOnInit() {
    this.http.post('/commissionConfig/queryCommissionConfig', { totalIncome: this.expectTotalIncome }, false).then(res => {
      this.formGroup.patchValue({ settleType1: res.result.wholeShopList[0].settleType });
      res.result.wholeShopList.map((group, idx) => {
        this.addWholeShop(group, 'commissionConfigList', idx);
      })
      this.formGroup.patchValue({ settleType2: res.result.managerCardList[0].settleType });
      res.result.managerCardList.map((group, idx) => {
        this.addWholeShop(group, 'managerCardList', idx);
      })
      this.formGroup.patchValue({ settleType3: res.result.saleCardList[0].settleType });
      res.result.saleCardList.map((group, idx) => {
        this.addWholeShop(group, 'saleCardList', idx);
      })
      if (res.result.directorCardList) {
        this.formGroup.patchValue({ settleType4: res.result.directorCardList[0].settleType });
        res.result.directorCardList.map((group, idx) => {
          this.addWholeShop(group, 'directorCardList', idx);
        })
      }
      if (res.result.teacherCardList) {
        this.formGroup.patchValue({ settleType5: res.result.teacherCardList[0].settleType });
        res.result.teacherCardList.map((group, idx) => {
          this.addWholeShop(group, 'teacherCardList', idx);
        })
      }
    });
    this.http.get('/work/list/motivation').then(res => {
      Object.keys(res.result.satisfityLevel).map(key => {
        res.result.satisfityLevel[key].map(level => {
          this.addLevel(key, level)
        })
      });
      res.result.serviceConfig.map((item, idx) => {
        this.addServiceConfigList(item, 'serviceConfig', idx);
      });
      res.result.clueConfig.map((item, idx) => {
        this.addServiceConfigList(item, 'clueConfig', idx);
      });
      res.result.practiceConfig.map((item, idx) => {
        this.addServiceConfigList(item, 'practiceConfig', idx);
      });
      res.result.otherConfig.map((item, idx) => {
        this.otherConfig.push(this.fb.group({
          id: [item.id],
          score: [item.score, [Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
        }))
      });
      this.excitationFormGroup.patchValue(res.result);
    })
  }

  get commissionConfigList() {
    return this.formGroup.controls['commissionConfigList'] as FormArray;
  }
  get managerCardList() {
    return this.formGroup.controls['managerCardList'] as FormArray;
  }
  get saleCardList() {
    return this.formGroup.controls['saleCardList'] as FormArray;
  }
  get directorCardList() {
    return this.formGroup.controls['directorCardList'] as FormArray;
  }
  get teacherCardList() {
    return this.formGroup.controls['teacherCardList'] as FormArray;
  }
  get level1() {
    return this.excitationFormGroup.controls['level1'] as FormArray;
  }
  get level2() {
    return this.excitationFormGroup.controls['level2'] as FormArray;
  }
  get level3() {
    return this.excitationFormGroup.controls['level3'] as FormArray;
  }
  get serviceConfig() {
    return this.excitationFormGroup.controls['serviceConfig'] as FormArray;
  }
  get clueConfig() {
    return this.excitationFormGroup.controls['clueConfig'] as FormArray;
  }
  get practiceConfig() {
    return this.excitationFormGroup.controls['practiceConfig'] as FormArray;
  }
  get otherConfig() {
    return this.excitationFormGroup.controls['otherConfig'] as FormArray;
  }

  addLevel(level: string, info: any = {}) {
    this[level].push(this.fb.group({
      id: [info.id],
      score: [info.score, [Validators.required, Validators.pattern(/^-?[0-9]\d*$/)]]
    }))
  }

  addWholeShop(info: any = {}, formArray, idx: number) {
    this[formArray].push(
      this.fb.group({
        id: [info.id],
        minAmount: [info.minAmount, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), this._minValidator(idx, formArray)]],
        maxAmount: [info.maxAmount, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), this._maxValidator(idx, formArray)]],
        ratio: [info.ratio, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
      })
    );
    this[formArray].controls[idx]['controls']['maxAmount'].valueChanges.subscribe(res => {
      if (idx != this[formArray].length - 1) {
        this[formArray].controls[idx + 1].patchValue({ minAmount: Number(res) });
      }
    });
  }

  addServiceConfigList(info: any, formArray, idx) {
    this[formArray].push(this.fb.group({
      id: [info.id],
      minCount: [info.minCount, [Validators.required, Validators.pattern(/^[1-9]\d*$/), this._serviceMinValidator(idx, formArray)]],
      maxCount: [info.maxCount, [Validators.required, Validators.pattern(/^[1-9]\d*$/), this._serviceMaxValidator(idx, formArray)]],
      ratio: [info.ratio, [Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    }));
    this[formArray].controls[idx]['controls']['maxCount'].valueChanges.subscribe(res => {
      if (idx != this[formArray].length - 1) {
        this[formArray].controls[idx + 1].patchValue({ minCount: Number(res) });
      }
    });
  }

  formControlError(key, type = 'required') {
    return this.formGroup.controls[key].dirty && this.formGroup.controls[key].hasError(type);
  }
  excitationControlError(key, type = 'required') {
    return this.excitationFormGroup.controls[key].dirty && this.excitationFormGroup.controls[key].hasError(type);
  }

  save(type, settleType) {
    if (this.formGroup.invalid) {
      Object.keys(this[type].controls).map(key => {
        this[type].controls[key].markAsDirty();
        this[type].controls[key].updateValueAndValidity();
      })
    } else {
      let params = {
        settleType: this.formGroup.value[settleType],
        commissionConfigList: JSON.stringify(this.formGroup.value[type])
      }
      this.http.post('/commissionConfig/upateCommissionConfigAmount', { paramJson: JSON.stringify(params) }, true).then(res => {

      })
    }
  }

  roleListChange(e) {
    if (!e && this.excitationFormGroup.controls['roleList'].valid) {
      this.http.get('/work/deleteorinserRole', { roles: this.excitationFormGroup.controls['roleList'].value.join(',') });
    }
  }

  saveServiceCongifList(formArray, requestPath, key) {
    if (this[formArray].valid) {
      let params = {};
      params[key] = JSON.stringify(this[formArray].value)
      this.http.get(requestPath, { paramJson: JSON.stringify(params) });
    }
  }

  integralChange() {
    if (this.excitationFormGroup.controls['integralConversion'].valid) {
      this.http.get('/work/update/integral', { integral: this.excitationFormGroup.controls['integralConversion'].value });
    }
  }
  scoreChange(group: FormGroup, source) {
    if (group.valid) {
      let { id, score } = group.value;
      this.http.get(source == 1 ? '/work/updateSatisfityLevel' : '/work/updateOtherConfig', { paramJson: JSON.stringify({ id, score }) })
    }
  }

  private _minValidator(idx, formArray: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      try {
        let result = Number(control.value) > Number(this[formArray].controls[idx]['controls']['maxAmount'].value);
        return result ? { 'error': true } : null;
      } catch (error) {
        return null;
      }
    };
  }

  private _maxValidator(idx, formArray: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      try {
        let result = Number(control.value) <= Number(this[formArray].controls[idx]['controls']['minAmount'].value);
        return result ? { 'error': true } : null;
      } catch (error) {
        return null;
      }
    };
  }

  private _serviceMinValidator(idx, formArray): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      try {
        let result = Number(control.value) > Number(this[formArray].controls[idx]['controls']['maxCount'].value);
        return result ? { 'error': true } : null;
      } catch (error) {
        return null;
      }
    };
  }
  private _serviceMaxValidator(idx, formArray): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      try {
        let result = Number(control.value) <= Number(this[formArray].controls[idx]['controls']['minCount'].value);
        return result ? { 'error': true } : null;
      } catch (error) {
        return null;
      }
    };
  }

}
