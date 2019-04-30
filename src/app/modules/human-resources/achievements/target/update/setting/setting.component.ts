import { FormBuilder, FormGroup, Validators, FormArray, ValidatorFn, AbstractControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/ng-relax/services/http.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.less']
})
export class SettingComponent implements OnInit {

  @Input() isInit: boolean;

  @Output() next: EventEmitter<number> = new EventEmitter();

  @Output() expectTotalIncome: EventEmitter<number> = new EventEmitter();

  formGroup: FormGroup;

  managerShopList: any[] = [];
  directorlistList: any[] = [];
  saleList: any[] = [];
  teacherList: any[] = [];
  dataSet: any[] = [];

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder()
  ) {
    this.formGroup = this.fb.group({
      id: [],
      expectTotalIncome: [, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      expectAvgCardprice: [, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      expectCardsuccessRate: [, [Validators.required, Validators.pattern(/^([1-9]\d*|[0]{1,1})$/)]],
      expectInvitationsuccessRate: [, [Validators.required, Validators.pattern(/^([1-9]\d*|[0]{1,1})$/)]],
      businessDay: [, [Validators.required, Validators.pattern(/^([1-9]\d*|[0]{1,1})$/)]],
      memberNum: [],
      expectIntoShopNum: [, [Validators.required, Validators.pattern(/^([1-9]\d*|[0]{1,1})$/)]],

      expectCardNum: [],
      expectExperienceNum: [],
      expectClueNum: [],

      personList: this.fb.array([
        this.fb.control([]),
        this.fb.control([]),
        this.fb.control([]),
        this.fb.control([])
      ], [this._personListValidator()])
    });
    /* ----------------- 监听：期望本月流水收入 ----------------- */
    this.formGroup.controls['expectTotalIncome'].valueChanges.subscribe(res => {
      if (this.formGroup.controls['expectTotalIncome'].valid) {
        let expectTotalIncome = Number(this.formGroup.controls['expectTotalIncome'].value)          //  期望本月流水收入
        let expectAvgCardprice = Number(this.formGroup.controls['expectAvgCardprice'].value);       //  期望卡单价
        let expectCardsuccessRate = Number(this.formGroup.controls['expectCardsuccessRate'].value); //  期望办卡成功率
        let expectInvitationsuccessRate = Number(this.formGroup.controls['expectInvitationsuccessRate'].value); //  期望电话邀约成功率
        if (expectAvgCardprice) {
          //  期望本月流水收入 / 期望卡单价 = 办卡数
          this.formGroup.patchValue({ expectCardNum: Math.ceil(expectTotalIncome / expectAvgCardprice) });
        }
        if (expectAvgCardprice && expectCardsuccessRate) {
          //  期望本月流水收入 / 期望卡单价 / 期望办卡成功率 = 体验人数
          this.formGroup.patchValue({ expectExperienceNum: Math.ceil((expectTotalIncome / expectAvgCardprice) / (expectCardsuccessRate / 100)) })
        }
        if (expectAvgCardprice && expectCardsuccessRate && expectInvitationsuccessRate) {
          //  期望本月流水收入 / 期望卡单价 / 期望办卡成功率 / 期望电话邀约成功率 = 邀约所需线索数
          this.formGroup.patchValue({ expectClueNum: Math.ceil(((expectTotalIncome / expectAvgCardprice) / (expectCardsuccessRate / 100)) / (expectInvitationsuccessRate / 100)) })
        }
      }
    });
    /* ----------------- 监听：期望卡单价 ----------------- */
    this.formGroup.controls['expectAvgCardprice'].valueChanges.subscribe(res => {
      if (this.formGroup.controls.expectAvgCardprice.valid) {
        let expectTotalIncome = Number(this.formGroup.controls['expectTotalIncome'].value)          //  期望本月流水收入
        let expectAvgCardprice = Number(this.formGroup.controls['expectAvgCardprice'].value);       //  期望卡单价
        let expectCardsuccessRate = Number(this.formGroup.controls['expectCardsuccessRate'].value); //  期望办卡成功率
        let expectInvitationsuccessRate = Number(this.formGroup.controls['expectInvitationsuccessRate'].value); //  期望电话邀约成功率
        if (expectTotalIncome) {
          //  期望本月流水收入 / 期望卡单价 = 办卡数
          this.formGroup.patchValue({ expectCardNum: Math.ceil(expectTotalIncome / expectAvgCardprice) });
        }
        if (expectTotalIncome && expectCardsuccessRate) {
          //  期望本月流水收入 / 期望卡单价 / 期望办卡成功率 = 体验人数
          this.formGroup.patchValue({ expectExperienceNum: Math.ceil((expectTotalIncome / expectAvgCardprice) / (expectCardsuccessRate / 100)) })
        }
        if (expectTotalIncome && expectCardsuccessRate && expectInvitationsuccessRate) {
          //  期望本月流水收入 / 期望卡单价 / 期望办卡成功率 / 期望电话邀约成功率 = 邀约所需线索数
          this.formGroup.patchValue({ expectClueNum: Math.ceil(((expectTotalIncome / expectAvgCardprice) / (expectCardsuccessRate / 100)) / (expectInvitationsuccessRate / 100)) })
        }
      }
    });
    /* ----------------- 监听：期望办卡成功率 ----------------- */
    this.formGroup.controls['expectCardsuccessRate'].valueChanges.subscribe(res => {
      if (this.formGroup.controls.expectCardsuccessRate.valid) {
        let expectTotalIncome = Number(this.formGroup.controls['expectTotalIncome'].value)          //  期望本月流水收入
        let expectAvgCardprice = Number(this.formGroup.controls['expectAvgCardprice'].value);       //  期望卡单价
        let expectCardsuccessRate = Number(this.formGroup.controls['expectCardsuccessRate'].value); //  期望办卡成功率
        let expectInvitationsuccessRate = Number(this.formGroup.controls['expectInvitationsuccessRate'].value); //  期望电话邀约成功率
        if (expectTotalIncome && expectAvgCardprice) {
          //  期望本月流水收入 / 期望卡单价 / 期望办卡成功率 = 体验人数
          this.formGroup.patchValue({ expectExperienceNum: Math.ceil((expectTotalIncome / expectAvgCardprice) / (expectCardsuccessRate / 100)) })
        }
        if (expectTotalIncome && expectAvgCardprice && expectInvitationsuccessRate) {
          //  期望本月流水收入 / 期望卡单价 / 期望办卡成功率 / 期望电话邀约成功率 = 邀约所需线索数
          this.formGroup.patchValue({ expectClueNum: Math.ceil(((expectTotalIncome / expectAvgCardprice) / (expectCardsuccessRate / 100)) / (expectInvitationsuccessRate / 100)) })
        }
      }
    });
    /* ----------------- 监听：期望电话邀约成功率 ----------------- */
    this.formGroup.controls['expectInvitationsuccessRate'].valueChanges.subscribe(res => {
      if (this.formGroup.controls.expectInvitationsuccessRate.valid) {
        let expectTotalIncome = Number(this.formGroup.controls['expectTotalIncome'].value)          //  期望本月流水收入
        let expectAvgCardprice = Number(this.formGroup.controls['expectAvgCardprice'].value);       //  期望卡单价
        let expectCardsuccessRate = Number(this.formGroup.controls['expectCardsuccessRate'].value); //  期望办卡成功率
        let expectInvitationsuccessRate = Number(this.formGroup.controls['expectInvitationsuccessRate'].value); //  期望电话邀约成功率
        if (expectTotalIncome && expectAvgCardprice && expectCardsuccessRate) {
          //  期望本月流水收入 / 期望卡单价 / 期望办卡成功率 / 期望电话邀约成功率 = 邀约所需线索数
          this.formGroup.patchValue({ expectClueNum: Math.ceil(((expectTotalIncome / expectAvgCardprice) / (expectCardsuccessRate / 100)) / (expectInvitationsuccessRate / 100)) })
        }
      }
    });
  }
  get personList() {
    return this.formGroup.get('personList') as FormArray;
  }

  ngOnInit() {
    let requestPath = this.isInit ? '/income/initShopIncome' : '/income/queryStoreIncomeConfig';
    this._init(requestPath);
  }

  formControlError(key, type = 'required') {
    return this.formGroup.controls[key].dirty && this.formGroup.controls[key].hasError(type);
  }

  saveLoading: boolean;
  save() {
    if (this.formGroup.invalid) {
      Object.keys(this.formGroup.controls).map(key => {
        this.formGroup.controls[key].markAsDirty();
        this.formGroup.controls[key].updateValueAndValidity();
      })
    } else {
      let params = this.formGroup.value;
      params.personList = [...params.personList[0], ...params.personList[1], ...params.personList[2], ...params.personList[3]];
      params.personList = JSON.stringify(params.personList.map(res => res = JSON.parse(res)));
      let requestPath = this.isInit ? '/income/saveIncomeGogal' : '/income/updateIncomeGogal';
      this.http.post(requestPath, { paramJson: JSON.stringify(params) }, true).then(res => {
        this._init('/income/queryStoreIncomeConfig');
        this.isInit = false;
      })
    }
  }

  private _init(requestPath) {
    this.http.post(requestPath).then(res => {
      let employeeList = [[], [], [], []];
      this.managerShopList = res.result.managerShopList.map(item => {
        item.value = JSON.stringify(item);
        res.result.employeeList.map(i => i.id === item.id && employeeList[0].push(item.value));
        return item;
      });
      this.directorlistList = res.result.directorlistList.map(item => {
        item.value = JSON.stringify(item);
        res.result.employeeList.map(i => i.id === item.id && employeeList[1].push(item.value));
        return item;
      });
      this.saleList = res.result.saleList.map(item => {
        item.value = JSON.stringify(item);
        res.result.employeeList.map(i => i.id === item.id && employeeList[2].push(item.value));
        return item;
      });
      this.teacherList = res.result.teacherList.map(item => {
        item.value = JSON.stringify(item);
        res.result.employeeList.map(i => i.id === item.id && employeeList[3].push(item.value));
        return item;
      });
      this.dataSet = res.result.monthTaskList;
      res.result.incomeGogal.personList = employeeList;
      res.result.id = res.result.incomeGogal.id;
      this.formGroup.patchValue(res.result.incomeGogal);
      this.expectTotalIncome.emit(res.result.incomeGogal.expectTotalIncome);
    })
  }

  private _personListValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      try {
        let controls = this.personList.controls;
        let result = !controls[0].value.length && !controls[1].value.length && !controls[2].value.length && !controls[3].value.length;
        return result ? { 'error': true } : null;
      } catch (error) {
        return null;
      }
    };
  }

}
