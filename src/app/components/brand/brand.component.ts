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
  brandForm: FormGroup;
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

  setCurrentBrand(brand: Brand) {
    this.currentBrand = brand;
    this.clearFilterFlag = false;
  }

  getCurrentBrandClass(brand: Brand) {
    if (brand == this.currentBrand) {
      return 'list-group-item list-group-item-action active';
    }
    return 'list-group-item list-group-item-info';
  }

  createBrandForm() {
    this.brandForm = this.formBuilder.group({
      brandName: ['', Validators.required],
    });
  }

  addBrand() {
    if (this.brandForm.valid) {
      var data: Brand = Object.assign({}, this.brandForm.value);
      this.brandService.addBrand(data).subscribe(
        (response) => {
          this.toastrService.success(
            'Ekleme Islemi Tamamlandi',
            data.brandName
          );
          this.getBrand();
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
      this.toastrService.error(
        'Girdiginiz Verilerin Dogrulugunu Kontrol Edin.',
        'Ekleme Sirasinda Hata Olustu.'
      );
    }
  }
}
