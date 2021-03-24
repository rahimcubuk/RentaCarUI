import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand/brand';
import { BrandService } from 'src/app/services/brand/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  currentBrand: Brand;
  clearFilterFlag = true;
  dataLoaded = false;
  brandText = '';

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.getBrand();
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
}
