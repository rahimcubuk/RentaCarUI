import { Pipe, PipeTransform } from '@angular/core';
import { CarDetails } from 'src/app/models/car/carDetails';

@Pipe({
  name: 'carFilter',
})
export class CarFilterPipe implements PipeTransform {
  transform(value: CarDetails[], key: string): CarDetails[] {
    key = key ? key.toLocaleLowerCase() : '';

    return key
      ? value.filter(
          (c: CarDetails) => c.carName.toLocaleLowerCase().indexOf(key) !== -1
        )
      : value;
  }
}
