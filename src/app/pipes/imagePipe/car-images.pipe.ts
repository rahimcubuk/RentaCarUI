import { Pipe, PipeTransform } from '@angular/core';
import { Car } from 'src/app/models/car/car';
import { CarDetails } from 'src/app/models/car/carDetails';
import { CarImageService } from 'src/app/services/carImage/car-image.service';

@Pipe({
  name: 'carImages',
})
export class CarImagesPipe implements PipeTransform {
  constructor(private imageService: CarImageService) {}
  transform(value: CarDetails, data: CarDetails): CarDetails {
    
    this.imageService.getImagesByCar(data.carId).subscribe((image) => {
      value.imagePath = image.data[0].imagePath;
    });
    return value;
  }
}
