import { NzDrawerRef } from 'ng-zorro-antd';
import { DrawerSave } from './../../../../ng-relax/decorators/drawer/save.decorator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from './../../../../ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';

@Component({
  selector: 'app-stop',
  templateUrl: './stop.component.html',
  styleUrls: ['./stop.component.less']
})
export class StopComponent implements OnInit {

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
      reopenDate: [, [Validators.required]]
    });
  }

  saveLoading: boolean;
  @DrawerSave('/memberCard/pauseCard') save: () => void;

  @DrawerClose() close: () => void;

}
