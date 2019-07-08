import { HttpService } from 'src/app/ng-relax/services/http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';
import { NzDrawerRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  @Input() id: number;

  formGroup: FormGroup;

  communityList: any = [];
  sourceList: any = [];
  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef
  ) {
    /* ----------------------- 获取该门店下所有小区 ----------------------- */
    this.http.post('/yeqs/member/communityList', {}, false).then(res => {
      this.communityList = res.result;
    });
    this.http.post('/yeqs/management/selectSource', {}, false).then(res => {
      this.sourceList = res.result;
      console.log(this.sourceList);
    });  
  }

  ngOnInit() {
    /* ------------------------- 初始化表单模型 ------------------------- */
    this.formGroup = this.fb.group({
      id: [this.id],
      name: [, [Validators.required]],
      nick: [],
      sex: [, [Validators.required]],
      birthday: [, [Validators.required]],
      parentName: [, [Validators.required]],
      fixPhone: [],
      mobilePhone: [, [Validators.required]],
      communityId: [, [Validators.required]],
      illHistory: [, [Validators.required]],
      allergieHistory: [, [Validators.required]],
      babyType: [, [Validators.required]],
      babyNumber: [, [Validators.required]],
      customerSourceId: [],
      comment: []
    });
    /* -------------------------- 用户信息回显 -------------------------- */
    if (this.id) {
      this.http.post('/yeqs/member/queryMemberById', { id: this.id }, false).then(res => {
        this.formGroup.patchValue(res.result);
      })
    }
  } 

  @DrawerClose() close: () => void;
  saveLoading: boolean;
  @DrawerSave('/yeqs/member/modifyMember') save: () => void;


  /* ------------ 宝宝生日禁止选择今天以后的日期 ------------ */
  _disabledDate(current: Date): boolean {
    return current && current.getTime() > Date.now();
  }

  
}
