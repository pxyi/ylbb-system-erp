import { NzMessageService } from 'ng-zorro-antd';
import { ReducersConf } from './../core/reducers/reducers-config';
import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable }             from 'rxjs';
import { Store } from '@ngrx/store';
 
 
@Injectable()
export class UserInfoResolver implements Resolve<boolean> {
  constructor(
    private router: Router,
    private store: Store<ReducersConf>,
    private message: NzMessageService
  ) { }
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return new Observable(observer => {
      try {
        let userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
        this.store.dispatch({ type: 'setUserInfo', payload: userInfo });
        if (!userInfo.id) throw "未登录";
          observer.next(true);
          observer.complete();
      } catch (e) {
        this.message.warning('请登录!');
        this.router.navigateByUrl('/login');
        observer.next(false);
        observer.complete();
      }
    })
  }
}