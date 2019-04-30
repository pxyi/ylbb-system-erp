import { NzDrawerRef } from 'ng-zorro-antd';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/ng-relax/services/http.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.less']
})
export class PreviewComponent implements OnInit {

  @Input() voucherInfo;

  @Input() code: string;

  formGroup: FormGroup;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef
  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      activityHeadline: [{ value: null, disabled: true }],
      activityType: [{ value: null, disabled: true }],
      payAmount: [{ value: 0, disabled: true }],
      babyName: [{ value: null, disabled: true }],
      birthday: [{ value: null, disabled: true }],
      phoneNum: [{ value: null, disabled: true }]
    });
    this.formGroup.patchValue(this.voucherInfo);
  }

  submit() {
    this.http.post('/activity/toVerification', { code: this.code }, true).then(res => {
      this.drawerRef.close(true);
    });
  }

}
