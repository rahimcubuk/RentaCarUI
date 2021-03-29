import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetails } from 'src/app/models/car/carDetails';
import { CarImage } from 'src/app/models/car/carImage';
import { Rental } from 'src/app/models/rental/rental';
import { CarService } from 'src/app/services/car/car.service';
import { CarImageService } from 'src/app/services/carImage/car-image.service';
import { RentalService } from 'src/app/services/rental/rental.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  car: CarDetails;
  rental: Rental;
  images: CarImage[] = [];
  edit = false;
  rentFlag = false;
  dataLoaded = false;
  constructor(
    private activedRoute: ActivatedRoute,
    private carService: CarService,
    private imageService: CarImageService,
    private rentalService: RentalService,
    private toastrService: ToastrService
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
    this.rentalService.getRentalByCar(carId).subscribe(
      (response) => {
        // this.rentFlag = response.data.returnDate == null ? true : false;
        if (response.data.returnDate != null) {
          let today = Date();
          var date1 = new Date(response.data.returnDate.toString());
          var date2 = new Date(today.toString());
          var difference = date2.getTime() - date1.getTime();
          console.log(date1 + ' ' + response.data.returnDate);
          this.rentFlag = difference < 0 ? true : false;
        } else this.rentFlag = true;
      },
      (response) => {
        this.rentFlag = false;
      }
    );
  }

  editCar() {
    this.edit = true;
  }

  editEvent($event: boolean) {
    this.edit = $event;
    this.getCarDetail(this.car.carId);
  }
}
