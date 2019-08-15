import { Pipe, PipeTransform } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Pipe({
  name: 'asTitle'
})
export class AsTitlePipe implements PipeTransform {
  titleCase = new TitleCasePipe();

  transform(value: string, args?: any): string {
    if (!value || typeof value !== 'string') {
      return '';
    }

    return value
      .replace(/[-_]/g, ' ')
      .split(' ')
      .filter(Boolean)
      .map(chunk => this.titleCase.transform(chunk))
      .join(' ');
  }

}
