import { TemplateRef } from '@angular/core';
import { routerReducer, RouterState } from './router-reducer';
import { userInfoReducer, UserInfoState } from "./userInfo-reducer";
import { breadcrumbReducer } from './breadcrumb-reducer';

export const reducersConfig = {
  userInfoState  : userInfoReducer,
  routerState    : routerReducer,
  breadcrumbState: breadcrumbReducer
}

export interface AppState {
  userInfoState  : UserInfoState;
  routerState    : RouterState;
  breadcrumbState: TemplateRef<any>;
}