import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'color',
})
export class ColorPipe implements PipeTransform {
  transform(colorName: string): string {
    const cssVars = getComputedStyle(document.documentElement);
    return cssVars.getPropertyValue(colorName).trim();
  }
}
