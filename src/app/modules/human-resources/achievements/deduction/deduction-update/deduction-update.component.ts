import { Component, OnInit, Input } from '@angular/core';
import { DrawerRefSave } from 'src/app/ng-relax/decorators/drawerRef.decorator';
import { DrawerRefClose } from 'src/app/ng-relax/decorators/drawerRefClose.decorator';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetList } from 'src/app/ng-relax/decorators/getList.decorator';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { NzDrawerRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-deduction-update',
  templateUrl: './deduction-update.component.html',
  styleUrls: ['./deduction-update.component.scss']
})
export class DeductionUpdateComponent implements OnInit {

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
      category: [, [Validators.required]],
      type: [, [Validators.required]],
      deductPoints: [, [Validators.required, Validators.pattern(/^\-?[0-9]+(\.\d{1,2})?$/)]],
      comment: []
    });
    this.dataInfo.id && this.formGroup.patchValue(this.dataInfo);
  }


  saveLoading: boolean;
  @DrawerRefSave('/attendance/saveAttendance') save: () => void;

  @DrawerRefClose() close: () => void;

}
