import { HttpService } from 'src/app/ng-relax/services/http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';
import { NzDrawerRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.less']
})
export class NumberComponent implements OnInit {

  @Input() id;

  @Input() memberCardInfo;

  formGroup: FormGroup;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef
  ) { }


  ngOnInit() {
    this.formGroup = this.fb.group({
      id: [this.id],
      type: [1],
      cardCode: [{ value: this.memberCardInfo.cardCode, disabled: true }],
      name: [{ value: this.memberCardInfo.name, disabled: true }],
      newCode: [, [Validators.required]],
    })
  }

  saveLoading: boolean;
  @DrawerSave('/memberCard/replaceCard') save: () => void;

  @DrawerClose() close: () => void;

}
