import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand/brand';
import { Car } from 'src/app/models/car/car';
import { Color } from 'src/app/models/color/color';
import { BrandService } from 'src/app/services/brand/brand.service';
import { CarService } from 'src/app/services/car/car.service';
import { ColorService } from 'src/app/services/color/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  @Input() carId: number;
  @Output() edit = new EventEmitter<boolean>();
  car: Car;
  brands: Brand[];
  colors: Color[];
  carForm: FormGroup;

  constructor(
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(params=>{
    //   this.getCar(params['carId']);
    // })
    this.getCar(this.carId);
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

  getCar(car: number) {
    this.carService.getCarById(car).subscribe((b) => {
      this.car = b.data;
    });
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

  cancel() {
    this.edit.emit(false);
  }

  updateCar() {
    if (this.carForm.valid) {
      var data: Car = Object.assign({}, this.carForm.value);
      data.carId = this.car.carId;
      data.brandId = parseInt(data.brandId.toLocaleString());
      data.colorId = parseInt(data.colorId.toLocaleString());
      this.carService.updateCar(data).subscribe(
        (response) => {
          this.toastrService.success(
            'Guncelleme Islemi Tamamlandi',
            data.carName
          );
          this.edit.emit(false);
        },
        (response) => {
          if (response.error.Errors.length > 0) {
            for (let i = 0; i < response.error.Errors.length; i++) {
              this.toastrService.error(
                response.error.Errors[i].ErrorMessage,
                'Guncelleme Sirasinda Hata Olustu.'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error(
        'Girdiginiz Verilerin Dogrulugunu Kontrol Edin.',
        'Guncelleme Sirasinda Hata Olustu.'
      );
    }
  }
}
