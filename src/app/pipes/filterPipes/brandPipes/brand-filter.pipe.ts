import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from 'src/app/models/brand/brand';

@Pipe({
  name: 'brandFilter',
})
export class BrandFilterPipe implements PipeTransform {
  transform(value: Brand[], key: string): Brand[] {
    key = key ? key.toLocaleLowerCase() : '';

    return key
      ? value.filter(
          (b: Brand) => b.brandName.toLocaleLowerCase().indexOf(key) !== -1
        )
      : value;
  }
}
