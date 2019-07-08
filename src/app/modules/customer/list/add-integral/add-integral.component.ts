import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';
import { NzDrawerRef } from 'ng-zorro-antd';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';

@Component({
  selector: 'app-add-integral',
  templateUrl: './add-integral.component.html',
  styleUrls: ['./add-integral.component.scss']
})
export class AddIntegralComponent implements OnInit {

  @Input() id;

  @Input() userInfo;

  formGroup: FormGroup;
  
  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef
  ) { 
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      memberId: [this.id],
      name: [{ value: this.userInfo.name, disabled: true }, [Validators.required]],
      memberPoint: [, [Validators.required]],
      comment: []
    })
  }

  @DrawerClose() close: () => void;
  saveLoading: boolean;
  @DrawerSave('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/member/saveMemberPoint') save: () => void;

}
