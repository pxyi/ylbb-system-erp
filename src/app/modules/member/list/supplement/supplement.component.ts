import { NzDrawerRef } from 'ng-zorro-antd';
import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';

@Component({
  selector: 'app-supplement',
  templateUrl: './supplement.component.html',
  styleUrls: ['./supplement.component.less']
})
export class SupplementComponent implements OnInit {

  @Input() id;

  @Input() memberCardInfo;

  formGroup: FormGroup

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef
  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      id: [this.id],
      type: [0],
      cardCode: [{ value: this.memberCardInfo.cardCode, disabled: true }],
      name: [{ value: this.memberCardInfo.name, disabled: true }],
      newSerial: [, [Validators.required]],
      newCode: [, [Validators.required]]
    });
  }

  saveLoading: boolean;
  @DrawerSave('/memberCard/replaceCard') save: () => void;

  @DrawerClose() close: () => void;

}
