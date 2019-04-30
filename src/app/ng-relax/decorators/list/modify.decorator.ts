/**
 * @method 删除数据
 */

export function ModifyData(requestPath) {
  return function (target, propertyKey) {
    target[propertyKey] = function (id) {
      this.http.post(requestPath, { id }, true).then(res => {
        this.listPage && this.listPage.eaTable._request();
        this.table && this.table._request();
      })
    }
  }
}
