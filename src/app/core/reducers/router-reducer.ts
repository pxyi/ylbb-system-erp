/**
 * @method 记录路由跳转信息
 * 
 * @param loginSource 记录 登录来源页（登录成功后再跳转回去）
 * 
 * @param goPath 记录当前前往的页面
 * 
 * @param currentPath 当前所在页面
 * 
 * @desc Store.dispatch({ type: ActionType, payload: Value });
 * 
 * @author phuhoang
 */
import { Action } from "@ngrx/store";

const routerStateDefalut =  {
  loginSource: '',
  goPath: '',
  currentPath: ''
}
export function routerReducer (state: RouterState = routerStateDefalut, action: Action) {
  switch (action.type) {
    case 'loginSource': 
      state.loginSource = action['payload'];
      return state;

    case 'goPath':
      state.goPath = action['payload'];
      return state;

    case 'currentPath':
      state.currentPath = action['payload'];
      return state;
    
    default: 
      return state;
  }
}

export interface RouterState {

  /* -------- 登录来源 -------- */
  loginSource: string;

  /* -------- 去往路径 -------- */
  goPath: string;

  /* -------- 当前路径 -------- */
  currentPath: string;

}