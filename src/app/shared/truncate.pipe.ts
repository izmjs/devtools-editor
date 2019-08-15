import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, maxLength = 230): string {
    if (typeof value !== 'string') {
      return '';
    }

    const result = value.substr(0, maxLength);

    return result === value ? result : `${result}...`;
  }
}
