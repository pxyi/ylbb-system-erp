import { AppState } from '../../../core/reducers/reducers-config';
import { Store } from '@ngrx/store';
import { NewinformationComponent } from './newinformation.component';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
@Injectable()
export class NewinformationCanDeactivate implements CanDeactivate<NewinformationComponent> {
  constructor(
    private confirm: NzModalService,
    private store: Store<AppState>
  ) { }

  canDeactivate(
    component: NewinformationComponent,
    route: ActivatedRouteSnapshot
  ): Observable<boolean> {
    return new Observable((observer) => {
      let _store = this.store;
      this.store.select('routerState').subscribe(res => {
        if (res.goPath.indexOf('/login') > -1 || JSON.stringify(component.customerForm.value) == JSON.stringify(component.customerFormInitValue)) {
          observer.next(true);
          observer.complete()
        } else {
          this.confirm.confirm({
            nzTitle: '确认离开此页面吗?',
            nzContent: '您还未保存信息',
            nzOkText: '确定离开',
            nzCancelText: '继续编辑',
            nzOnOk() {
              observer.next(true);
              observer.complete()
            },
            nzOnCancel() {
              _store.dispatch({ type: 'goPath', payload: res.currentPath });
              observer.next(false);
              observer.complete()
            }
          });
        }
      })
    })
  }
}