import { Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad, Route } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/reducers/reducers-config';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {
  canActivate() {
    /* ---------------------- 获取本地存储用户信息 ---------------------- */
    try {
      let userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
      this.store.dispatch({ type: 'setUserInfo', payload: userInfo });
      if (!userInfo.id) throw "未登录";
        return true;
    } catch (e) {
      this.message.warning('请登录!');
      this.router.navigateByUrl('/login');
      return false;
    }
  }

  canLoad(route: Route): Observable<boolean> | boolean {
    return new Observable(observer => {
      this.store.select('userInfoState').subscribe(res => {
        if (res.roleAllowPath.indexOf(`/home/${route.path}`) === -1) {
          this.router.navigateByUrl('/system/error/403');
        }
        observer.next(res.roleAllowPath.indexOf(`/home/${route.path}`) > -1);
        observer.complete();
      })
    })
  }

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private message: NzMessageService
  ) {

  }
}