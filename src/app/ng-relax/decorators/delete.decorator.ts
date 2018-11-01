/**
 * @method 删除数据
 * @param param 请求地址
 * @author phuhoang
 */

export function DeleteData(param: string) {
  return function (target, propertyKey) {
    target[propertyKey] = function (id) {
      this.http.post(param, { id }).then(res => this.listPage.eaTable._request());
    }
  }
}
