/**
 * @method 动态添加抽屉组件，点击关闭
 * @param param 请求地址
 * @author phuhoang
 */

export function DrawerRefClose() {
  return function (target, propertyKey) {
    target[propertyKey] = function () {
      this.drawerRef.close();
    }
  }
}
