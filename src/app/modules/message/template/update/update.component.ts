import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.less']
})
export class UpdateComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef
  ) { 
    this.formGroup = this.fb.group({
      id: [],
      title: [, [Validators.required]],
      memo: [, [Validators.required]],
    });
  }

  ngOnInit() {
  }

  saveLoading: boolean;
  @DrawerClose() close: () => void;
  @DrawerSave('/smsTemplate/modify') save: () => void;

}
