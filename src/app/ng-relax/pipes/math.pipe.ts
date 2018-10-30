import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'math'
})
export class MathPipe implements PipeTransform {

  transform(value: any, args: any = 'round'): any {
    if (!value) { return ''; }
    return Math[args](value);
  }

}
