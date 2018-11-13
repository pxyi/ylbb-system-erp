import { AppState } from './../core/reducers/reducers-config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { UserInfoState } from '../core/reducers/userInfo-reducer';
import { Component, OnInit } from '@angular/core';;
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ea-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  isCollapsed = false;

  userInfo: UserInfoState;

  queryForm: FormGroup;
  formGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private store: Store<AppState>
  ) { 
    this.queryForm = this.fb.group({ mobilePhone: [, [Validators.required, Validators.pattern(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/)]] });
    this.formGroup = this.fb.group({
      id: [],
      name: [],
      nick: [],
      sex: [],
      monthAge: [],
      babyType: [],
      mobilePhone: [],
      cardCode: [],
      cardTypeName: [],
      surplusTimes: [],
      tongTimes: [],
      expireDays: [],
      expireDate: []
    });
    this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
    this.store.dispatch({ type: 'setUserInfo', payload: this.userInfo });
    window.document.title = `${this.userInfo.store['shopName']}-鱼乐贝贝ERP管理系统`;
  }

  showDrawer: boolean;
  ngOnInit() {
  }

  queryLoading: boolean;
  queryMember() {
    if (this.queryForm.valid) {
      this.queryLoading = true;
      this.http.post('/homePage/getMemberDetail', this.queryForm.value).then(res => {
        this.formGroup.patchValue(res.result);
        this.queryLoading = false;
      }).catch(err => {this.formGroup.reset(); this.queryLoading = false;});
    }
  }

}
