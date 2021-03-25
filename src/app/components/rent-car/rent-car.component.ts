import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetails } from 'src/app/models/car/carDetails';
import { Customer } from 'src/app/models/customer/customer';
import { Rental } from 'src/app/models/rental/rental';
import { CarService } from 'src/app/services/car/car.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-rent-car',
  templateUrl: './rent-car.component.html',
  styleUrls: ['./rent-car.component.css'],
})
export class RentCarComponent implements OnInit {
  car: CarDetails;
  rental: Rental;
  customers: Customer[] = [];
  rentDate: Date;
  returnDate: Date;
  rentForm: FormGroup;
  payVisible = false;

  constructor(
    private activedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private carService: CarService,
    private customerService: CustomerService,
    private rentalService: RentalService
  ) {}

  ngOnInit(): void {
    this.activedRoute.params.subscribe((params) => {
      this.getCarDetail(params['carId']);
      this.getCustomers(), this.createRentForm();
    });
  }

  getCarDetail(carId: number) {
    this.carService.getCarDetails(carId).subscribe((response) => {
      this.car = response.data;
    });
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe((c) => {
      this.customers = c.data;
    });
  }

  createRentForm() {
    this.rentForm = this.formBuilder.group({
      rentDate: ['', Validators.required],
      returnDate: [''],
      carId: [''],
      customerId: ['', Validators.required],
    });
  }

  rent() {
    if (this.rentForm.valid) {
      var data = Object.assign({}, this.rentForm.value);
      data.carId = this.car.carId;
      data.customerId = parseInt(data.customerId);
      this.rental = data;
      this.payVisible = true;
      //this.router.navigate(['/payment/', JSON.stringify(rentModel)]);
      this.toastrService.info('Odeme Sayfasina Yonlendiriliyorsunuz.');
    } else {
      this.toastrService.error('Bilgilerin dogrulugundan emin olun.', 'HATA!');
    }
  }
}
