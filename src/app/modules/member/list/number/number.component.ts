import { NzDrawerRef } from 'ng-zorro-antd';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
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
      memberName: [{ value: this.memberCardInfo.memberName, disabled: true }],
      newCode: [, [Validators.required]],
    })
  }

  @DrawerClose() close: () => void;
  saveLoading: boolean;
  @DrawerSave('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/memberCard/replaceCard') save: () => void;

}
