/**
 * @method 获取列表数据
 * @param param 请求地址
 * @author phuhoang
 */

export function GetList(param) {
  return function (target, propertyKey) {
    target[propertyKey] = function () {
      target[propertyKey] = [];
      this.http.post(param, {}, false).then(res => target[propertyKey] = res.code == 1000 ? res.result : []).catch(err => target[propertyKey] = []);
    }
  }
}