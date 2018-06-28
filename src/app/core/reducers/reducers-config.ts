import { routerReducer, RouterState } from './router-reducer';
import { userInfoReducer, UserInfoState } from "./userInfo-reducer";

export const reducersConfig = {
  userInfoState  : userInfoReducer,
  routerState    : routerReducer
}

export interface ReducersConf {
  userInfoState  : UserInfoState;
  routerState    : RouterState
}