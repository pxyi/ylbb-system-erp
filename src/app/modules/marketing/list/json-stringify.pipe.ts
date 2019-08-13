import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'JSONStringify'})
export class JSONStringifyPipe implements PipeTransform {
  transform(value: number): string {
    return encodeURIComponent(JSON.stringify(value));
  }
}