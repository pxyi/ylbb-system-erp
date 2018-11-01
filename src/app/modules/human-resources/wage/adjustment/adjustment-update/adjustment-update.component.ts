import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetList } from 'src/app/ng-relax/decorators/getList.decorator';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { NzDrawerRef } from 'ng-zorro-antd';
import { DrawerRefSave } from 'src/app/ng-relax/decorators/drawerRef.decorator';
import { DrawerRefClose } from 'src/app/ng-relax/decorators/drawerRefClose.decorator';

@Component({
  selector: 'app-adjustment-update',
  templateUrl: './adjustment-update.component.html',
  styleUrls: ['./adjustment-update.component.scss']
})
export class AdjustmentUpdateComponent implements OnInit {

  @Input() dataInfo;

  formGroup: FormGroup;

  @GetList('/member/getStoreTeachers') teacherList: any;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder,
    private drawerRef: NzDrawerRef
  ) {
    typeof this.teacherList === 'function' && this.teacherList();
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      id: [],
      employeeId: [, [Validators.required]],
      month: [, [Validators.required]],
      adjustWages: [, [Validators.required, Validators.pattern(/^\-?[0-9]+(\.\d{1,2})?$/)]],
      adjustReason: [, [Validators.required]],
      remark: []
    });
    this.dataInfo.id && this.formGroup.patchValue(this.dataInfo);
  }


  saveLoading: boolean;
  @DrawerRefSave('/payrollAdjustLog/savePayrollAdjustLog') save: () => void;

  @DrawerRefClose() close: () => void;
  
}
