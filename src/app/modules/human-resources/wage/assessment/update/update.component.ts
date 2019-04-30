import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  @Input() dataInfo;

  formGroup: FormGroup;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder,
    private drawerRef: NzDrawerRef
  ) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      id: [],
      type: [, [Validators.required]],
      name: [, [Validators.required]],
      duty: [, [Validators.required, Validators.pattern(/^\-?[0-9]+(\.\d{1,2})?$/)]]
    });
    this.dataInfo && this.formGroup.patchValue(this.dataInfo);
  }

  saveLoading: boolean;
  @DrawerSave('/payrollCompConfig/savePayrollCompConfig') save: () => void;

  @DrawerClose() close: () => void;

}
