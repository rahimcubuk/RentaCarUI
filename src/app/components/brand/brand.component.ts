import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand/brand';
import { BrandService } from 'src/app/services/brand/brand.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  currentBrand: Brand;
  brandAddForm: FormGroup;
  brandUpdateForm: FormGroup;
  clearFilterFlag = true;
  dataLoaded = false;
  brandText = '';

  constructor(
    private brandService: BrandService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getBrand();
    this.createBrandForm();
  }

  getBrand() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded = true;
    });
  }

  clearFilter() {
    this.clearFilterFlag = true;
    this.getBrand();
  }

  setCurrentBrand(brand: Brand, flag:boolean) {
    this.currentBrand = brand;
    this.clearFilterFlag = flag;
  }

  getCurrentBrandClass(brand: Brand) {
    if (brand == this.currentBrand && this.clearFilterFlag) {
      return 'list-group-item list-group-item-info active col-9';
    }
    return 'list-group-item list-group-item-info col-9';
  }

  createBrandForm() {
    this.brandAddForm = this.formBuilder.group({
      brandName: ['', Validators.required],
    });
    this.brandUpdateForm = this.formBuilder.group({
      brandName: ['', Validators.required],
    });
  }

  validErrorControl(response: any) {
    if (response.error.Errors.length > 0) {
      for (let i = 0; i < response.error.Errors.length; i++) {
        this.toastrService.error(
          response.error.Errors[i].ErrorMessage,
          'Ekleme Sirasinda Hata Olustu.'
        );
      }
    }
  }

  addBrand() {
    if (this.brandAddForm.valid) {
      var data: Brand = Object.assign({}, this.brandAddForm.value);
      this.brandService.addBrand(data).subscribe(
        (response) => {
          this.toastrService.success(
            'Ekleme Islemi Tamamlandi',
            data.brandName
          );
          this.getBrand();
        },
        (response) => {
          this.validErrorControl(response);
        }
      );
    } else {
      this.toastrService.error(
        'Girdiginiz Verilerin Dogrulugunu Kontrol Edin.',
        'Ekleme Sirasinda Hata Olustu.'
      );
    }
  }

  updateBrand() {
    if (this.brandUpdateForm.valid) {
      var data: Brand = Object.assign({}, this.brandUpdateForm.value);
      this.brandService.updateBrand(data).subscribe(
        (response) => {
          this.toastrService.success(
            'Ekleme Islemi Tamamlandi',
            data.brandName
          );
          this.getBrand();
        },
        (response) => {
          this.validErrorControl(response);
        }
      );
    } else {
      this.toastrService.error(
        'Girdiginiz Verilerin Dogrulugunu Kontrol Edin.',
        'Ekleme Sirasinda Hata Olustu.'
      );
    }
  }
}
