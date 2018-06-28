import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { ReducersConf } from './reducers/reducers-config';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(
    private store  : Store<ReducersConf>,
    private router : Router
  ) { 
    /* ---------------------- 获取本地存储用户信息 ---------------------- */
    try {
      let userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
      store.dispatch({ type: 'setUserInfo', payload: userInfo });
      if (!userInfo.id) throw "未登录";
    } catch (e) {
      router.navigateByUrl('/login');
    }

    /* ---------- 监听路由变化, 获取登录来源页, 去往页面， 当前页 ---------- */
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        store.dispatch({ type: 'goPath', payload: event.url });
        if (event.url.indexOf('/login') === -1) {
          store.dispatch({ type: 'loginSource', payload: event.url })
        }
      }

      if (event instanceof NavigationEnd) {
        store.dispatch({ type: 'currentPath', payload: event.url })
      }
    });
  }
}
