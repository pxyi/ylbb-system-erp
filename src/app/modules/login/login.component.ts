import { NzModalService } from 'ng-zorro-antd';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { serialize } from 'src/app/core/http.intercept';
import { RouterState } from 'src/app/core/reducers/router-reducer';
import { AppState } from 'src/app/core/reducers/reducers-config';

declare const CryptoJS;

@Component({
  selector: 'ea-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  loginForm    : FormGroup;

  loginLoading : boolean;

  loginError   : string = '';
  showPawssword: boolean = false;

  hostname: string = window.location.hostname.split('.')[1];

  private baseRouter: RouterState;

  constructor(
    private http       : HttpClient,
    private router     : Router,
    private fb         : FormBuilder = new FormBuilder(),
    private activated  : ActivatedRoute,
    private store      : Store<AppState>,
    private modal      : NzModalService
  ) {
    this.store.select('routerState').subscribe( res => this.baseRouter = res);
  }

  ngOnInit() {
    /* -------- 更改浏览器 Title 及关闭页面 Modal/Drawer 等弹出层 -------- */
    window.document.title = 'ERP-登录';
    this.modal.closeAll();

    /* ------------------- 判断本地是否存储用户名密码 ------------------- */
    try {
      let userName = window.localStorage.getItem('relax') ? JSON.parse(this._decrypt_(window.localStorage.getItem('relax'))) : {};
      this._loginFormInit(userName);
    } catch (e) {
      this._loginFormInit();
    }

    /* ----------- 根据地址栏参数，自动请求登录接口，实现免密登录 ----------- */
    this.activated.queryParamMap.subscribe((query: any) => {
      if (query.params.authCode) {
        this._login(query.params.authCode);
      }
    });
  }


  /* ------------------------- 初始化模型表单 ------------------------- */
  _loginFormInit(obj: object = {}): void {
    this.loginForm = this.fb.group({
      username: [obj['username'] || '', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      password: [obj['password'] || '', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      remember: [true]
    });
    this.loginForm.valueChanges.subscribe(res => {
      this.loginError = '';
    })
  }


  /* ----------------------------- 登录 ----------------------------- */
  _submit() {
    if (this.loginForm.valid) {
      this._login();
    } else {
      for (let i in this.loginForm.controls) {
        this.loginForm.controls[i].markAsDirty();
        this.loginForm.controls[i].updateValueAndValidity();
      }
    }
  }
  private _login(authCode?: string | boolean): void {
    if (this.loginLoading) { return; }
    this.loginLoading = true;
    /* --------- 根据authCode是否存在,判断是否为免密登录 --------- */
    let params;
    if (authCode) {
      params = { authCode: authCode };
    } else {
      params = JSON.parse(JSON.stringify(this.loginForm.value));
      params.password = this._encrypt(params.password);
    }
    this.http.post<any>('/auth/login', serialize(params), {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    }).subscribe(res => {
      this.loginLoading = false;
      if (res.code == 1000) {
        /* ------------------ 存储用户名密码及用户信息 ------------------ */
        this.store.dispatch({ type: 'setUserInfo', payload: res.result })
        if (params.remember && !authCode) {
          window.localStorage.setItem('relax', this._encrypt_(JSON.stringify(this.loginForm.value)));
        }
        // this.router.navigateByUrl(this.baseRouter.loginSource || '/home/index');
        this.router.navigateByUrl('/home/index');
      } else {
        this.loginError = res.info;
      }
    }, err => {
      this.loginLoading = false;
    })
  }

  /* ------------------------ AES加密 ------------------------ */
  private key = CryptoJS.enc.Utf8.parse('yulebaby88888888')             // 秘钥
  _encrypt(str: string): string {
    let srcs = CryptoJS.enc.Utf8.parse(str);
    let encrypted = CryptoJS.AES.encrypt(srcs, this.key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.toString();
  }

  private iv = CryptoJS.enc.Utf8.parse('');
  _encrypt_(word) {
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, this.key, { iv: this.iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
  }
  _decrypt_(word) {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, this.key, { iv: this.iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  }


}
