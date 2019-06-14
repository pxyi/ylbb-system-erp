import { Action } from '@ngrx/store';
import { environment } from 'src/environments/environment';
/**
 * @method 记录用户信息
 * 
 * @author phuhoang
 */

export function userInfoReducer (state: UserInfoState, action: Action) {
  switch (action.type) {
    case 'setUserInfo':
      try {
        let roleAllowPath = [];
        action['payload'].roles.map(role => {
          role.roleJsonInfo && (roleAllowPath = roleAllowPath.concat(role.roleJsonInfo.split(',')));
        });
        action['payload']['roleAllowPath'] = Array.from(new Set(roleAllowPath)).join(',');
        window.localStorage.setItem(`userInfo${environment.version.replace(/\./g, '')}`, JSON.stringify(action['payload']));
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
  id      : number;
  roles   : RoleConfig[];
  status  : number;
  store   : StoreConfig;
  roleAllowPath?: string;
}
interface RoleConfig {
  id      : number;
  code    : string;
  roleJsonInfo: string;
}
interface StoreConfig {
  id      : number;
  logo    : string;
  shopName: string;
  shopBrand: ShopBrand
}
interface ShopBrand {
  id      : number;
  brandName: string;
}