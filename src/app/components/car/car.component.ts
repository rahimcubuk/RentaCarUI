import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car/car';
import { CarDetails } from 'src/app/models/car/carDetails';
import { CarService } from 'src/app/services/car/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  carDetails: CarDetails[] = [];
  dataLoaded = false;
  filterText = '';

  constructor(
    private carService: CarService,
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

  getAllDetail() {
    this.carService.getAllDetail().subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
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
