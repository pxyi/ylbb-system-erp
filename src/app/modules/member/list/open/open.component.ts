import { NzDrawerRef } from 'ng-zorro-antd';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';

@Component({
  selector: 'app-open',
  templateUrl: './open.component.html',
  styleUrls: ['./open.component.scss']
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
      cardCode: [{value: this.memberCardInfo.cardCode, disabled: true}],
      memberName: [{ value: this.memberCardInfo.memberName, disabled: true }],
      modifyDate: [{ value: this.memberCardInfo.modifyDate, disabled: true }],
      stopEndDate: [{ value: this.memberCardInfo.stopEndDate, disabled: true }],
    })
  }

  @DrawerClose() close: () => void;
  saveLoading: boolean;
  @DrawerSave('/yeqs/memberCard/reopenCard') save: () => void;

}
