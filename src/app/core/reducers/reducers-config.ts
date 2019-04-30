import { routerReducer, RouterState } from './router-reducer';
import { userInfoReducer, UserInfoState } from "./userInfo-reducer";

export const reducersConfig = {
  userInfoState  : userInfoReducer,
  routerState    : routerReducer,
}

export interface AppState {
  userInfoState  : UserInfoState;         // 用户信息
  routerState    : RouterState;           // 路由跳转信息
}