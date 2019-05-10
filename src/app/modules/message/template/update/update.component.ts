import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/reducers/reducers-config';

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
    private drawerRef: NzDrawerRef,
    private store: Store<AppState>
  ) { 
    this.formGroup = this.fb.group({
      id: [],
      prefix: [{ value: null, disabled: true }],
      suffix: [{ value: '回复TD退订', disabled: true}],
      title: [, [Validators.required]],
      memo: [, [Validators.required]],
    });
  }

  ngOnInit() {
    this.store.select('userInfoState').subscribe(res => this.formGroup.patchValue({ prefix: `【${res.store.shopBrand.brandName}】` }))
  }

  saveLoading: boolean;
  @DrawerClose() close: () => void;
  @DrawerSave('/smsTemplate/modify') save: () => void;

}
