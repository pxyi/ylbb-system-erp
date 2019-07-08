import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { NzModalService, NzDrawerRef } from 'ng-zorro-antd';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {

  @Input() id;
  @Input() memberCardInfo;

  formGroup: FormGroup;

  cardTypeList: any[] = [];
  teacherList: any[] = [];

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private modal: NzModalService,
    private drawerRef: NzDrawerRef
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      id: [this.id],
      cardCode: [{ value: this.memberCardInfo.cardCode, disabled: true }],
      name: [{ value: this.memberCardInfo.name, disabled: true }],
      nick: [{ value: this.memberCardInfo.nick, disabled: true }],
      sex: [{ value: this.memberCardInfo.sex, disabled: true }],
      monthAge: [{ value: this.memberCardInfo.monthAge, disabled: true }],
      cardTypeName: [{ value: this.memberCardInfo.ctName, disabled: true }],
      salesName: [{ value: this.memberCardInfo.salesName, disabled: true }],
      withdrawAmount: [{ value: this.memberCardInfo.withdrawAmount == null ? this.memberCardInfo.cardTypeWithdrawAmount : this.memberCardInfo.withdrawAmount, disabled: true }],
      usedTimes: [{ value: this.memberCardInfo.usedTimes + this.memberCardInfo.usedFreeTimes , disabled: true }],
      balance: [{ value: this.memberCardInfo.balance, disabled: true }],
      amount: [{ value: this.memberCardInfo.balance - (this.memberCardInfo.usedTimes + this.memberCardInfo.usedFreeTimes) * this.memberCardInfo.withdrawAmount, disabled: true }],
      comment: []
    })
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
      this.modal.confirm({
        nzTitle: '<i>您确定要退卡吗?</i>',
        nzContent: '<b>会员姓名：'+this.memberCardInfo.name+'</b><br><b>会员年龄：'+this.memberCardInfo.monthAge+'</b><br><b>会员卡：'+this.memberCardInfo.ctName+'</b><br><b>实际办卡金额：'+this.memberCardInfo.balance+'</b><br><b>使用次数：'+(this.memberCardInfo.usedTimes + this.memberCardInfo.usedFreeTimes)+'</b><br><b>退卡单次价格：'+(this.memberCardInfo.withdrawAmount == null ? this.memberCardInfo.cardTypeWithdrawAmount : this.memberCardInfo.withdrawAmount)+'</b><br><b>应退款：'+(this.memberCardInfo.balance - (this.memberCardInfo.usedTimes + this.memberCardInfo.usedFreeTimes) * this.memberCardInfo.withdrawAmount)+'</b><br><b>成长顾问：'+(this.memberCardInfo.salesName == null ? '' : this.memberCardInfo.salesName)+'</b>',
        nzOnOk: () => this.withdrawCard(),
        nzOnCancel: () => {this.saveLoading = false;}
      });
    }
  }

  /* -------------------- 退卡请求 -------------------- */
  withdrawCard() {
    this.http.post('/yeqs/memberCard/withdrawCard', {
      paramJson: JSON.stringify(this.formGroup.value)
    }).then(res => this.drawerRef.close(true));
  }

}
