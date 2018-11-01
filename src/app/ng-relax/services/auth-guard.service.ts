import { Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad, Route, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/reducers/reducers-config';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return new Observable(observer => {
      this.store.select('userInfoState').subscribe(res => {
        if (res.roleAllowPath.indexOf('**') === -1) {
          observer.next(true);
          observer.complete();
        }
        let stateUrl = state.url.indexOf('/(') > -1 ? state.url.split('/(')[0]
                       : state.url.indexOf('?') > -1 ? state.url.split('?')[0]
                       : state.url;
        if (res.roleAllowPath.indexOf(stateUrl) === -1) {
          this.router.navigateByUrl('/system/error/403');
        }
        observer.next(res.roleAllowPath.indexOf(stateUrl) > -1);
        observer.complete();
      })
    })
  }

  canLoad(route: Route): Observable<boolean> | boolean {
    return new Observable(observer => {
      this.store.select('userInfoState').subscribe(res => {
        if (res.roleAllowPath.indexOf('**') === -1) {
          observer.next(true);
          observer.complete();
        }
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