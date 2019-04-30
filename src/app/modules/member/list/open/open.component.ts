import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from './../../../../ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';
import { NzDrawerRef } from 'ng-zorro-antd';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';

@Component({
  selector: 'app-open',
  templateUrl: './open.component.html',
  styleUrls: ['./open.component.less']
})
export class OpenComponent implements OnInit {

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
      cardCode: [{ value: this.memberCardInfo.cardCode, disabled: true }],
      name: [{ value: this.memberCardInfo.name, disabled: true }],
      stopDate: [{ value: this.memberCardInfo.stopDate, disabled: true }],
      stopEndDate: [{ value: this.memberCardInfo.stopEndDate, disabled: true }],
    })
  }

  saveLoading: boolean;
  @DrawerSave('/memberCard/reopenCard') save: () => void;

  @DrawerClose() close: () => void;

}
