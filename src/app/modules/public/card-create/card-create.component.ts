import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { NzModalService, NzDrawerRef } from 'ng-zorro-antd';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';

@Component({
  selector: 'app-card-create',
  templateUrl: './card-create.component.html',
  styleUrls: ['./card-create.component.less']
})
export class CardCreateComponent implements OnInit {

  @Input() id;

  @Input() userInfo;

  formGroup: FormGroup;
  
  feeType: number;


  cardAttribuiteList: any[] = [];

  cardTypeList: any[] = [];
  employeeList: any[] = [];
  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private modal: NzModalService,
    private drawerRef: NzDrawerRef
  ) { 
    this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/cardAttributeController/getList').then(res => this.cardAttribuiteList = res.result);
    this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/employee/listEmployee').then(res => this.employeeList = res.result);
  }

  cardTypeInfo: any;
  ngOnInit() {
    let formControls: any = {
      memberId: [this.id],
      cardCode: [this.userInfo.memberCard || null, [Validators.required, Validators.maxLength(30)]],
      serialNumber: [this.userInfo.serialNumber || null],
      cardTypeId: [, [Validators.required]],
      memberName: [this.userInfo.name, [Validators.required]],
      usedTimes: [0],
      balance: [],
      openPoints: [],
      effectDate: [],
      expireDate: [],
      employeeId:  [, [Validators.required]],
      turnCard: [],
      comment: [],
      attributeId: [, [Validators.required]]
    }
    this.formGroup = this.fb.group(formControls);
    this.formGroup.get('cardTypeId').valueChanges.subscribe(id => {
      this.cardTypeList.map(item => item.id === id && (this.feeType = item.feeType));
      this.formTypeChange(this.feeType)
      this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/cardTypeManagement/getCardType', { id }, false).then(res => {
        res.result && this.formGroup.patchValue(res.result);
      });
    });


    this.formGroup.get('attributeId').valueChanges.subscribe(type => {
      this.cardTypeList.map(item => item.type === type && (this.feeType = item.feeType));
      this.formTypeChange(this.feeType)
      this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/cardTypeManagement/findList', { type }, false).then(res => {
        this.cardTypeList = res.result;
      });
    });
    
  }


  formTypeChange(val) {
    if (val == 0) {
      this.formGroup.addControl('times', new FormControl());
      this.formGroup.addControl('freeTimes', new FormControl());

      this.formGroup.removeControl('amount');
      this.formGroup.removeControl('freeAmount');
    
    } else {
      this.formGroup.addControl('amount', new FormControl());
      this.formGroup.addControl('freeAmount', new FormControl());

      this.formGroup.removeControl('times');
      this.formGroup.removeControl('freeTimes');
    }
  }

  @DrawerClose() close: () => void;
  saveLoading: boolean;
  save() {
    if (this.formGroup.invalid) {
      for (let i in this.formGroup.controls) {
        this.formGroup.controls[i].markAsDirty();
        this.formGroup.controls[i].updateValueAndValidity();
      }
    } else {
      this.saveLoading = true;
      if (!this.userInfo.memberCard && !this.formGroup.value.serialNumber) {
        this.modal.confirm({
          nzTitle: '<i>您确定要建卡吗?</i>',
          nzContent: '<b>没有输入卡序列号，此卡为非实体卡，确认创建？</b>',
          nzOnOk: () => this.createCard(),
          nzOnCancel: () => {this.saveLoading = false}
        });
      } else {
        this.createCard();
      }
    }
  }

  /* -------------------- 建卡请求 -------------------- */
  createCard() {
    this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/member/createCard', {
      paramJson: JSON.stringify(this.formGroup.value)
    }, true).then(res => this.drawerRef.close(true)).catch(err => this.saveLoading = false);
  }

}
