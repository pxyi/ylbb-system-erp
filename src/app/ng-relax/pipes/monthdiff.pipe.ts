import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthdiff'
})
export class MonthdiffPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) { return '--'; }
    let nowDay = new Date();
    let [y, m, d] = [nowDay.getFullYear(), nowDay.getMonth() + 1, nowDay.getDay()];

    return this._monthDiff(new Date(value), new Date(y, m, d));
  }

  _monthDiff(d1, d2): number {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

}
