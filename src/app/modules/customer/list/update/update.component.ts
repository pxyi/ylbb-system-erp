import { NzDrawerRef } from 'ng-zorro-antd';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.less']
})
export class UpdateComponent implements OnInit {

  @Input() id: number;
  @Input() sourceId: number;

  formGroup: FormGroup;

  communityList: any = [];
  recommenderList: any[] = [];
  collectorList: any[] = [];
  sourceList: any[] = [];

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef
  ) {
    /* ----------------------- 获取该门店下所有小区 ----------------------- */
    this.http.post('/member/communityList').then(res => {
      this.communityList = res.result;
      !this.id && this.formGroup.patchValue({ communityId: res.result[0].id })
    });
    this.http.post('/common/recommenderList').then(res => this.recommenderList = res.result);
    this.http.post('/retrunVisit/getEmployeeList').then(res => this.collectorList = res.result);
  }

  ngOnInit() {
    /* ------------------------- 初始化表单模型 ------------------------- */
    this.formGroup = this.fb.group({
      id: [this.id],
      name: [, [Validators.required]],
      nick: [],
      sex: ['男', [Validators.required]],
      birthday: [, [Validators.required]],
      parentName: [, [Validators.required]],
      fixPhone: [],
      mobilePhone: [, [Validators.required]],
      communityId: [, [Validators.required]],
      illHistory: [0, [Validators.required]],
      allergieHistory: [0, [Validators.required]],
      babyType: ['婴儿', [Validators.required]],
      babyNumber: [1],
      sourceId: [, [Validators.required]],
      recommendedId: [],
      collectorId: [],
      comment: []
    });
    /* ------------------------- 客户来源回显 ------------------------- */
    this.http.post('/memberSource/getList').then(res => this.sourceList = res.result);
    /* -------------------------- 用户信息回显 -------------------------- */
    if (this.id) {
      this.http.post('/member/queryMemberById', { id: this.id }, false).then(res => {
        this.formGroup.patchValue(res.result);
      })
    }
  }

  @DrawerClose() close: () => void;
  
  saveLoading: boolean;
  @DrawerSave('/member/modifyMember') save: () => void;


  /* ------------ 宝宝生日禁止选择今天以后的日期 ------------ */
  _disabledDate(current: Date): boolean {
    return current && current.getTime() > Date.now();
  }

  
}
