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