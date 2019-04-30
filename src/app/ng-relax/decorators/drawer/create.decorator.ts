import { Type, TemplateRef } from '@angular/core';
/**
 * @method 创建抽屉
 */

export function DrawerCreate(options: DrawerCreateOption) {
  return function (target, propertyKey) {
    target[propertyKey] = function (params?) {
      this.drawer.create({
        nzTitle: options.title || null,
        nzWidth: options.width || 720,
        nzContent: options.content,
        nzBodyStyle: {
          'padding-bottom': '53px'
        },
        nzClosable: typeof options.closable === 'boolean' ? options.closable : true,
        nzContentParams: Object.assign(options.params || {}, params)
      }).afterClose.subscribe((res: boolean) => {
        if (options.close) {
          options.close(res);
        } else if (res) {
          this.listPage && this.listPage.eaTable._request();
          this.table && this.table._request();
        }
      });
    }
  }
}
interface DrawerCreateOption {
  title?: string;
  width?: number;
  closable?: boolean;
  content: Type<any> | TemplateRef<any>;
  params?: any;
  close?: any;
}