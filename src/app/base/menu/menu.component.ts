import { ReducersConf } from './../../core/reducers/reducers-config';
import { Store } from '@ngrx/store';
import { Component, Input } from '@angular/core';
import { RouterState } from './../../core/reducers/router-reducer';
import { UserInfoState } from '../../core/reducers/userInfo-reducer';

@Component({
  selector: 'ea-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  @Input() isCollapsed: boolean = false;

  routerState: RouterState;
  userInfo: UserInfoState;
  shopNameFontSize = 24;

  constructor(
    private store: Store<ReducersConf>
  ) {
    store.select('routerState').subscribe(res => this.routerState = res);

    store.select('userInfoState').subscribe(res => this.userInfo = res);
    this.shopNameFontSize = 160 / this.userInfo.store['shopName'].length > 24 ? 24 : 160 / this.userInfo.store['shopName'].length;
  }

}
