import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'snakeCaseToCapitalCamelCase' })
export class SnakecaseToCapitalcamelcasePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }
    const words = value.split('_');
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
}