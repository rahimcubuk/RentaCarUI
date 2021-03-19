import { Pipe, PipeTransform } from '@angular/core';
import { Color } from 'src/app/models/color/color';

@Pipe({
  name: 'colorFilter',
})
export class ColorFilterPipe implements PipeTransform {
  transform(value: Color[], key: string): Color[] {
    key = key ? key.toLocaleLowerCase() : '';

    return key
      ? value.filter(
          (c: Color) => c.colorName.toLocaleLowerCase().indexOf(key) !== -1
        )
      : value;
  }
}
