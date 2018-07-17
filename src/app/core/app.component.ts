import { NzMessageService } from 'ng-zorro-antd';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { AppState } from './reducers/reducers-config';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  constructor(
    private store  : Store<AppState>,
    private router : Router,
    private message: NzMessageService
  ) { 

    /* ---------- 监听路由变化, 获取登录来源页, 去往页面， 当前页 ---------- */
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        store.dispatch({ type: 'goPath', payload: event.url });
        if (event.url.indexOf('/login') === -1) {
          store.dispatch({ type: 'loginSource', payload: event.url });
        }
        if (event.url.indexOf('/home/account/modify') > -1) {
          store.dispatch({ type: 'loginSource', payload: '/home' });
        }
      }

      if (event instanceof NavigationEnd) {
        store.dispatch({ type: 'setBreadcrumb' });
        store.dispatch({ type: 'currentPath', payload: event.url });
      }
    });

    try {
      let userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
      this.store.dispatch({ type: 'setUserInfo', payload: userInfo });
      if (!userInfo.id) throw "未登录";
    } catch (e) {
      this.message.warning('请登录!');
      this.router.navigateByUrl('/login');
    }
  }
}
