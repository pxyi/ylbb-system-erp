import { Router } from '@angular/router';
import { UserInfoState } from '../../core/reducers/userInfo-reducer';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ea-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {


  @Output() isCollapsedChange: EventEmitter<boolean> = new EventEmitter();

  @Input() isCollapsed: boolean = false;

  userInfo: UserInfoState;
  constructor(
    private store: Store<UserInfoState>,
    private router: Router
  ) { 
    store.select('userInfoState').subscribe(res => {
      this.userInfo = res;
      window.document.title = `${res.store.shopName}-鱼乐贝贝`;
    });
  }


  TapIsCollapsed() {
    this.isCollapsed = !this.isCollapsed;
    this.isCollapsedChange.emit(this.isCollapsed);
  }

  signOut(): void {
    window.localStorage.removeItem('userInfo');
    this.router.navigateByUrl('/login');
  }

}
