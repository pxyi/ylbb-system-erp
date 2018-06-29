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