import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car/car';
import { CarDetails } from 'src/app/models/car/carDetails';
import { CarImage } from 'src/app/models/car/carImage';
import { CarService } from 'src/app/services/car/car.service';
import { CarImageService } from 'src/app/services/carImage/car-image.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  carDetails: CarDetails[] = [];
  dataLoaded = false;
  data: CarDetails[] = [];
  constructor(
    private carService: CarService,
    private imageService: CarImageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['colorId']) {
        this.getCarByColor(params['colorId']);
      } else if (params['brandId']) {
        this.getCarByBrand(params['brandId']);
      } else {
        this.getAllDetail();
      }
    });

    this.getAllDetail();
  }

  // getCarImage(data:CarDetails[]) {
  //   this.data.forEach((element) => {
  //     console.log("dasdas");
  //     this.imageService.getImagesByCar(element.carId).subscribe((response) => {
  //       element.imagePath = response.data[0].imagePath;
  //       console.log(element.imagePath);console.log("dasdas");
  //     });
  //   });
  // }

  getAll() {
    this.carService.getAll().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getAllDetail() {
    this.carService.getAllDetail().subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
    // this.getCarImage(this.carDetails);
  }

  getCarByColor(color: number) {
    this.carService.getCarByColor(color).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = response.success;
    });
  }

  getCarByBrand(brand: number) {
    this.carService.getCarByBrand(brand).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = response.success;
    });
  }
}
