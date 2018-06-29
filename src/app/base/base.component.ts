import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ReducersConf } from '../core/reducers/reducers-config';
import { UserInfoState } from '../core/reducers/userInfo-reducer';

@Component({
  selector: 'ea-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  isCollapsed = false;

  userInfo: UserInfoState;

  constructor(
    private store: Store<ReducersConf>
  ) { }

  ngOnInit() {
    this.store.select('userInfoState').subscribe(res => {
      this.userInfo = res;
      window.document.title = `${this.userInfo.store['shopName']}-鱼乐贝贝`;
    });
  }

}
