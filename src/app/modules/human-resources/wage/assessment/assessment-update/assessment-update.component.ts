import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd';
import { DrawerRefSave } from 'src/app/ng-relax/decorators/drawerRef.decorator';
import { DrawerRefClose } from 'src/app/ng-relax/decorators/drawerRefClose.decorator';

@Component({
  selector: 'app-assessment-update',
  templateUrl: './assessment-update.component.html',
  styleUrls: ['./assessment-update.component.scss']
})
export class AssessmentUpdateComponent implements OnInit {

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
    this.dataInfo.id && this.formGroup.patchValue(this.dataInfo);
  }

  saveLoading: boolean;
  @DrawerRefSave('/attendance/saveAttendance') save: () => void;

  @DrawerRefClose() close: () => void;
  
}
