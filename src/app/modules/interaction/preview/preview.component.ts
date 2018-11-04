import { DrawerRefClose } from 'src/app/ng-relax/decorators/drawerRefClose.decorator';
import { NzDrawerRef } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from './../../../ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer.decorator';
import { DrawerRefSave } from 'src/app/ng-relax/decorators/drawerRef.decorator';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  
  @Input() dataInfo;
  
  formGroup: FormGroup

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef
  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      memberName: [{ value: this.dataInfo.memberName, disabled: true }],
      name: [{ value: this.dataInfo.name, disabled: true }],
      phone: [{ value: this.dataInfo.phone, disabled: true }],
      content: [{ value: this.dataInfo.content, disabled: true }],
      status: [{ value: this.dataInfo.status, disabled: this.dataInfo.status == 1 }],
      deal: [{ value: this.dataInfo.deal, disabled: this.dataInfo.status == 1 }, [Validators.required]]
    })
  }

  @DrawerRefClose() close: () => void;

  saveLoading: boolean;
  @DrawerRefSave('/userAdvice/save') save: () => void;

}
