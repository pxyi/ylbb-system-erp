import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';
import { NzDrawerRef } from 'ng-zorro-antd';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';
import { HttpService } from 'src/app/ng-relax/services/http.service';

@Component({
  selector: 'app-card-open',
  templateUrl: './card-open.component.html',
  styleUrls: ['./card-open.component.less']
})
export class CardOpenComponent implements OnInit {

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
  @DrawerSave('/yeqs/memberCard/reopenCard') save: () => void;

  @DrawerClose() close: () => void;

}
