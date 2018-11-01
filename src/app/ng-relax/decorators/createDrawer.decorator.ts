/**
 * @method 创建抽屉
 * @author phuhoang
 */

export function CreateDrawer(title, component, width?) {
  return function (target, propertyKey) {
    target[propertyKey] = function (dataInfo = {}) {
      const drawer = this.drawer.create({
        nzTitle: title,
        nzWidth: width || 720,
        nzContent: component,
        nzContentParams: { dataInfo }
      });
      drawer.afterClose.subscribe(res => res && this.listPage.eaTable._request());
    }
  }
}
