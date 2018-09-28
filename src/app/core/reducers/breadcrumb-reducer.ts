/**
 * @method 设置ContentHeader（面包屑内容）
 * 
 * @desc Store.dispatch({ type: 'setBreadcrumb', payload: BreadcrumbTmpt });
 * 
 * @author phuhoang
 */
import { Action } from '@ngrx/store';
import { TemplateRef } from '@angular/core';
export function breadcrumbReducer (state: TemplateRef<any>, action: Action) {
  switch (action.type) {
    case 'setBreadcrumb':
      return action['payload'];
    default:
      return state;
  }
}