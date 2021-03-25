import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand/brand';
import { Car } from 'src/app/models/car/car';
import { Color } from 'src/app/models/color/color';
import { BrandService } from 'src/app/services/brand/brand.service';
import { CarService } from 'src/app/services/car/car.service';
import { ColorService } from 'src/app/services/color/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  brands: Brand[];
  colors: Color[];
  carForm: FormGroup;
  constructor(
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createCarForm();
    this.getBrands();
    this.getColors();
  }

  createCarForm() {
    this.carForm = this.formBuilder.group({
      carName: ['', Validators.required],
      brandId: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      description: [''],
    });
  }

  addCar() {
    if (this.carForm.valid) {
      var data: Car = Object.assign({}, this.carForm.value);
      data.brandId = parseInt(data.brandId.toLocaleString());
      data.colorId = parseInt(data.colorId.toLocaleString());
      console.log(data);
      this.carService.addCar(data).subscribe(
        (response) => {
          this.toastrService.success('Ekleme Islemi Tamamlandi', data.carName);
          this.router.navigate(['car']);
        },
        (response) => {
          if (response.error.Errors.length > 0) {
            for (let i = 0; i < response.error.Errors.length; i++) {
              this.toastrService.error(
                response.error.Errors[i].ErrorMessage,
                'Ekleme Sirasinda Hata Olustu.'
              );
            }
          }
        }
      );
    } else {
      var data: Car = Object.assign({}, this.carForm.value);
      console.log(data);
      this.toastrService.error(
        'Girdiginiz Verilerin Dogrulugunu Kontrol Edin.',
        'Ekleme Sirasinda Hata Olustu.'
      );
    }
  }

  getBrands() {
    this.brandService.getBrands().subscribe((b) => {
      this.brands = b.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((b) => {
      this.colors = b.data;
    });
  }
}
