import { Action } from '@ngrx/store';

export function userInfoReducer (state: UserInfoState, action: Action) {
  switch (action.type) {
    case 'setUserInfo':
      try {
        let roleAllowPath = [];
        action['payload'].roles.map(role => {
          role.roleJsonInfo && (roleAllowPath = roleAllowPath.concat(role.roleJsonInfo.split(',')));
        });
        action['payload']['roleAllowPath'] = Array.from(new Set(roleAllowPath)).join(',');
        window.localStorage.setItem('userInfo', JSON.stringify(action['payload']));
        return action['payload'];
      } catch (error) {
        return state;
      }
    
    default:
      return state;
  }
}
export interface UserInfoState {
  name    : string;
  email?  : string;
  id      : number;
  roles   : any[];
  status  : number;
  store   : object;
  roleAllowPath?: string;
}