import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { Rental } from 'src/app/models/rental/rental';
import { CarDetails } from 'src/app/models/car/carDetails';
import { CarService } from 'src/app/services/car/car.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  @Input() rental: Rental;
  @Input() carDetail: CarDetails;
  totalPrice: number = 0;
  payForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private paymentService: PaymentService,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe((params) => {
    //   if (params['rental']) {
    //     this.rental =params['rental'];// JSON.parse(params['rental']);
    //     this.getCarDetails();
    //   }
    // });
    this.createPayForm();
    this.getRentSummary();
  }

  getRentSummary() {
    if (this.rental.returnDate != null) {
      var date1 = new Date(this.rental.returnDate.toString());
      var date2 = new Date(this.rental.rentDate.toString());
      var difference = date1.getTime() - date2.getTime();
      var totalDate = Math.ceil(difference / (1000 * 3600 * 24));
      this.totalPrice = totalDate * this.carDetail.dailyPrice;
    } else {
      this.totalPrice = this.carDetail.dailyPrice;
    }
  }

  createPayForm() {
    this.payForm = this.formBuilder.group({
      nameOnTheCard: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cardCvv: ['', Validators.required],
      expirationMonth: ['', Validators.required],
      expirationYear: ['', Validators.required],
    });
  }

  pay() {
    if (this.payForm.valid) {
      let payment = Object.assign({}, this.payForm.value);
      this.paymentService.CheckCreditCard(payment.cardNumber).subscribe(
        (response) => {
          this.toastrService.info(
            'Odeme Islemi Onaylandi.',
            'Iyi Yolculuklar.'
          );
        },
        (response) => {
          this.toastrService.error('HATA!', response.error.message);
        }
      );
    } else {
      let payment = Object.assign({}, this.payForm.value);
      console.log(payment);
      this.toastrService.error('HATA!', 'Bilgilerin dogrulugundan emin olun.');
    }
  }
}
