import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {

  @Input() id;

  @Input() userInfo;

  formGroup: FormGroup;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder()
  ) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      memberId: [this.id],
      name: [{value: this.userInfo.name, disabled: true}],
      nick: [{value: this.userInfo.nick, disabled: true}],
      sex: [{value: this.userInfo.sex, disabled: true}],
      monthAge: [{value: this.userInfo.monthAge, disabled: true}],
      babyType: [{value: this.userInfo.babyType, disabled: true}],
      communityName: [{value: this.userInfo.communityName, disabled: true}],
      exchangePoint: [, [Validators.required]],
      exchangeRemark: [, [Validators.required]],
    })
  }


  save(): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.formGroup.invalid) {
        for (let i in this.formGroup.controls) {
          this.formGroup.controls[i].markAsDirty();
          this.formGroup.controls[i].updateValueAndValidity();
        }
        resolve(false);
      } else {
        this.http.post('/member/redeem', {
          paramJson: JSON.stringify(this.formGroup.value)
        }).then(res => resolve(true)).catch(err => resolve(false));
      }
    })
  }

}
