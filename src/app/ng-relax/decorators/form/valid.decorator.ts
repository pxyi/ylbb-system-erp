export function ControlValid() {
  return function (target, propertyKey) {
    target[propertyKey] = function (key, type) {
      let t = type || 'required';
      return this.formGroup.controls[key].dirty && this.formGroup.controls[key].hasError(t);
    }
  }
}
