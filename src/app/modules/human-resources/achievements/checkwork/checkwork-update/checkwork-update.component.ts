import { NzDrawerRef } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from './../../../../../ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { DrawerRefSave } from 'src/app/ng-relax/decorators/drawerRef.decorator';
import { DrawerRefClose } from 'src/app/ng-relax/decorators/drawerRefClose.decorator';
import { GetList } from 'src/app/ng-relax/decorators/getList.decorator';

@Component({
  selector: 'app-checkwork-update',
  templateUrl: './checkwork-update.component.html',
  styleUrls: ['./checkwork-update.component.scss']
})
export class CheckworkUpdateComponent implements OnInit {

  @Input() dataInfo;

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
    this.dataInfo.id && this.formGroup.patchValue(this.dataInfo);
  }


  saveLoading: boolean;
  @DrawerRefSave('/attendance/saveAttendance') save: () => void;

  @DrawerRefClose() close: () => void;

}
