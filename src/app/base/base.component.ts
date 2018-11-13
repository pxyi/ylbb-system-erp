import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { UserInfoState } from '../core/reducers/userInfo-reducer';
import { Component, OnInit } from '@angular/core';;
import { ActivatedRoute } from '@angular/router';

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
    private fb: FormBuilder = new FormBuilder()
  ) { 
    this.queryForm = this.fb.group({ mobilePhone: [, [Validators.required, Validators.pattern(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/)]] });
  }

  showDrawer: boolean;

  ngOnInit() {
    this.route.data.subscribe((res: { userInfo: UserInfoState }) => {
      this.userInfo = res.userInfo;
      window.document.title = `${this.userInfo.store['shopName']}-鱼乐贝贝ERP管理系统`;
    })
  }

  cardList: any[] = [];
  queryMember() {
    if (this.queryForm.valid) {
      this.http.post('/homePage/getMemberDetail', this.queryForm.value).then(res => {
        this.formGroup.patchValue(res.result);
        if (res.result.havacard) {
          this.http.post('/memberCard/getMemberCards', { memberId: res.result.memberId }, false).then(res => {
            this.cardList = res.result;
            res.result.length && this.formGroup.patchValue({ cardId: res.result[0].id });
          });
        }
      }).catch(err => this.formGroup.reset());
    }
  }

}
