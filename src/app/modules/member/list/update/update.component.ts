import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';
import { NzDrawerRef } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.less']
})
export class UpdateComponent implements OnInit {
  @Input() id;

  @Input() memberCardInfo;
  cardTypeList: any[] = [];
  teacherList: any[] = [];
  showSave: boolean;
  showErrText: string = '';
  formGroup: FormGroup
  constructor(
    private http: HttpService,
    private format: DatePipe,
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef
  ) { 
    this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/member/getStoreTeachers', {}, false).then(res => {  this.teacherList = res.result; });
    this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/cardTypeManagement/findList', {}, false).then(res => {
      res.result.map(item=>{
          if(item.skillsStatus == 1){
              this.cardTypeList.push(item);
          }
      })
    });

  }

  ngOnInit() {
    if((this.memberCardInfo.remainTimes + this.memberCardInfo.remainFreeTimes)%3 != 0){
      this.showErrText = `会员卡升级失败，卡次剩余${ (this.memberCardInfo.remainTimes + this.memberCardInfo.remainFreeTimes)%3 }次,请变更后重试`;
      this.showSave = true;
    }

    this.formGroup = this.fb.group({
      id: [this.id],
      cardCode1: [{ value: this.memberCardInfo.cardCode, disabled: true }],//卡号
      cardCode: [this.memberCardInfo.cardCode],//卡号
      name: [{ value: this.memberCardInfo.name || this.memberCardInfo.memberName, disabled: true }], //姓名
      heNum: [{ value: this.memberCardInfo.remainTimes + this.memberCardInfo.remainFreeTimes, disabled: true }], //剩余卡次
      orgTypeId: [{ value: this.memberCardInfo.cardTypeId }], //原卡类型id,
      newTypeId: [ ,[Validators.required]],//新卡类型id
      orgTimes: [this.memberCardInfo.remainTimes],//原正价卡次
      newTimes: [(this.memberCardInfo.remainTimes + this.memberCardInfo.remainFreeTimes)%3 == 0 ? this.memberCardInfo.remainTimes: null],//现正价卡次
      orgFreeTimes: [this.memberCardInfo.remainFreeTimes,],//原赠送卡次
      newFreeTimes: [, [Validators.required]],//现赠送卡次
      orgExpireDate: [{ value: this.memberCardInfo.expireDate, disabled: true }],//原停卡日期
      expireDate: [this.memberCardInfo.expireDate, [Validators.required]],//现停卡日期     
      employeeId:[, [Validators.required]],//销售老师id
      comment: [, [Validators.required]]//备注
    });
  }
  dateChange(e, data) {
    data.startDate = this.format.transform(e, 'yyyy-MM-dd');
  }
  @DrawerClose() close: () => void;
  saveLoading: boolean;
  @DrawerSave('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/curriculum/MembershipUpgrade') save: () => void;

}
