import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetails } from 'src/app/models/car/carDetails';
import { CarImage } from 'src/app/models/car/carImage';
import { CarService } from 'src/app/services/car/car.service';
import { CarImageService } from 'src/app/services/carImage/car-image.service';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  car: CarDetails;
  images: CarImage[] = [];
  rentFlag = false;
  deneme: string = '';
  dataLoaded = false;

  constructor(
    private activedRoute: ActivatedRoute,
    private carService: CarService,
    private imageService: CarImageService,
    private rentalService: RentalService
  ) {}

  ngOnInit(): void {
    this.activedRoute.params.subscribe((params) => {
      this.getCarDetail(params['carId']);
      this.getCarImages(params['carId']);
      this.isRent(params['carId']);
    });
  }

  getCarDetail(carId: number) {
    this.carService.getCarDetails(carId).subscribe((response) => {
      this.car = response.data;
      this.dataLoaded = response.success;
    });
  }

  getCarImages(carId: number) {
    this.imageService.getImagesByCar(carId).subscribe((response) => {
      this.images = response.data;
    });
  }

  isRent(carId: number) {
    this.rentalService.getRentalByCar(carId).subscribe((response) => {
      this.rentFlag = response.data.returnDate == null ? true : false;
    });
  }
}
