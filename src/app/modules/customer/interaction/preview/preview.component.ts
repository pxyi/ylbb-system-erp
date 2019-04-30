import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { NzDrawerRef } from 'ng-zorro-antd';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.less']
})
export class PreviewComponent implements OnInit {

  @Input() interactionInfo;

  formGroup: FormGroup

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef
  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      id: [this.interactionInfo.id],
      memberName: [{ value: this.interactionInfo.memberName, disabled: true }],
      name: [{ value: this.interactionInfo.name, disabled: true }],
      phone: [{ value: this.interactionInfo.phone, disabled: true }],
      content: [{ value: this.interactionInfo.content, disabled: true }],
      status: [{ value: this.interactionInfo.status, disabled: this.interactionInfo.status == 1 }],
      deal: [{ value: this.interactionInfo.deal, disabled: this.interactionInfo.status == 1 }, [Validators.required]]
    })
  }

  @DrawerClose() close: () => void;

  saveLoading: boolean;
  @DrawerSave('/userAdvice/save') save: () => void;

}
