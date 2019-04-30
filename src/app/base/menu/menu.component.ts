import { Component, OnInit, Input } from '@angular/core';
import { UserInfoState } from 'src/app/core/reducers/userInfo-reducer';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/reducers/reducers-config';
import { MenuConfig } from 'src/app/core/menu-config';
import { RouterState } from 'src/app/core/reducers/router-reducer';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {

  @Input() userInfo: UserInfoState;

  routerState: RouterState;

  roleAllowPath: string;

  logoPath: string;

  menuConfig: any[] = MenuConfig;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.select('routerState').subscribe(res => this.routerState = res);

    this.store.select('userInfoState').subscribe(res => {
      this.roleAllowPath = res.roleAllowPath;
      this.logoPath = res.store.logo;
    });
  }

}
