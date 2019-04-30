/**
 * @method 动态添加抽屉组件，点击关闭
 */

export function DrawerClose() {
  return function (target, propertyKey) {
    target[propertyKey] = function () {
      this.drawerRef.close();
    }
  }
}
