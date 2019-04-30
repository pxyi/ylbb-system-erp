import { Component, OnInit, Input } from '@angular/core';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { GetList } from 'src/app/ng-relax/decorators/getList.decorator';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.less']
})
export class UpdateComponent implements OnInit {

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
    this.dataInfo && this.formGroup.patchValue(this.dataInfo);
  }


  saveLoading: boolean;
  @DrawerSave('/payrollAdjustLog/savePayrollAdjustLog') save: () => void;

  @DrawerClose() close: () => void;

}
