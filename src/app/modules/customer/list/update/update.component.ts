import { HttpService } from 'src/app/ng-relax/services/http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { DrawerSave } from '../../../../ng-relax/decorators/drawer.decorator';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  @Input() id: number;

  formGroup: FormGroup;

  communityList: any = [];

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder()
  ) {
    /* ----------------------- 获取该门店下所有小区 ----------------------- */
    this.http.post('/member/communityList', {}, false).then(res => {
      this.communityList = res.result;
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
      babyNumber: [],
      source: [],
      comment: []
    });
    /* -------------------------- 用户信息回显 -------------------------- */
    if (this.id) {
      this.http.post('/member/queryMemberById', { id: this.id }, false).then(res => {
        this.formGroup.patchValue(res.result);
      })
    }
  } 

  @DrawerSave('/member/modifyMember') save: () => Promise<boolean>;


  /* ------------ 宝宝生日禁止选择今天以后的日期 ------------ */
  _disabledDate(current: Date): boolean {
    return current && current.getTime() > Date.now();
  }

  
}
