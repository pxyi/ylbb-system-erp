import { NzDrawerRef } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from './../../../../../ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';
import { GetList } from 'src/app/ng-relax/decorators/getList.decorator';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.less']
})
export class UpdateComponent implements OnInit {

  @Input() checkworkInfo: any = {};

  formGroup: FormGroup;

  @GetList('/member/getStoreTeachers') teacherList: any;
  @GetList('/payrollCompConfig/getPayrollCompConfigList') payrollList: any;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder,
    private drawerRef: NzDrawerRef
  ) {
    typeof this.teacherList === 'function' && this.teacherList();
    typeof this.payrollList === 'function' && this.payrollList();
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      id: [],
      employeeId: [, [Validators.required]],
      workDate: [, [Validators.required]],
      reason: [, [Validators.required]],
      wages: [, [Validators.required, Validators.pattern(/^\-?[0-9]+(\.\d{1,2})?$/)]],
      comment: []
    });
    this.formGroup.get('reason').valueChanges.subscribe(res => {
      this.payrollList.map(item => item.id === res && this.formGroup.patchValue({ wages: item.duty }));
    });
    this.checkworkInfo.id && this.formGroup.patchValue(this.checkworkInfo);
  }


  saveLoading: boolean;
  @DrawerSave('/attendance/saveAttendance') save: () => void;

  @DrawerClose() close: () => void;

}
