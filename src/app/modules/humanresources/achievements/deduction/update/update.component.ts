import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetList } from 'src/app/ng-relax/decorators/getList.decorator';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { NzDrawerRef } from 'ng-zorro-antd';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.less']
})
export class UpdateComponent implements OnInit {

  @Input() dataInfo: any = {};

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
  @DrawerSave('/attendance/saveAttendance') save: () => void;

  @DrawerClose() close: () => void;

}
