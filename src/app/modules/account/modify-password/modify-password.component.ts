import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ValidatorFn, FormControl, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-modify-password',
  templateUrl: './modify-password.component.html',
  styleUrls: ['./modify-password.component.scss']
})
export class ModifyPasswordComponent implements OnInit {

  passwordForm: FormGroup;

  modifyLoading: boolean;

  constructor(
    private fb: FormBuilder = new FormBuilder(),
    private http: HttpService,
    private message: NzMessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.passwordForm = this.fb.group({
      password: [, [Validators.required]],
      newPw: [, [Validators.required]],
      cofirmPw: [, [this.confirmPasswordValidator]]
    })
  }

  /* ---------------------- 修改密码 ---------------------- */
  modifyPassword() {
    if (this.passwordForm.valid) {
      this.modifyLoading = true;
      this.http.post('/passwordModify/modify', { paramJson: JSON.stringify(this.passwordForm.value) }, false).then(res => {
        this.modifyLoading = false;
        if (res.code == 1000) {
          window.localStorage.removeItem('userInfo');
          this.router.navigateByUrl('/login');
        }
        this.message.create(res.code == 1000 ? 'success' : 'warning', res.code == 1000 ? '修改密码成功，请重新登录' : res.info);
      })
    } else {
      for (let i in this.passwordForm.controls) {
        this.passwordForm.controls[i].markAsDirty();
        this.passwordForm.controls[i].updateValueAndValidity();
      }
    }
  }

  /* --------------- Validator 确认密码校验 --------------- */
  confirmPasswordValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.passwordForm.controls.newPw.value) {
      return { confirm: true, error: true };
    }
  };

}
