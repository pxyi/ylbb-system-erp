import { UserInfoState } from './reducers/userInfo-reducer';
import { NzMessageService } from 'ng-zorro-antd';
import { AppState } from './reducers/reducers-config';
import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
 
 
@Injectable()
export class UserInfoResolver implements Resolve<UserInfoState> {
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private message: NzMessageService
  ) { }
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserInfoState> {
    return new Observable(observer => {
        this.store.select('userInfoState').subscribe(res => {
          if (res) {
            observer.next(res);
            observer.complete();
          } else {
            let userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
            this.store.dispatch({ type: 'setUserInfo', payload: userInfo });
            observer.next(userInfo);
            observer.complete();
          }
        })
    })
  }
}