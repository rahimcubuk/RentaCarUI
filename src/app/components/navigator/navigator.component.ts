import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand/brand';
import { Color } from 'src/app/models/color/color';
import { BrandService } from 'src/app/services/brand/brand.service';
import { ColorService } from 'src/app/services/color/color.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {
  colors: Color[] = [];
  brands: Brand[] = [];
  colorLoaded = false;
  brandLoaded = false;
  constructor(
    private colorService: ColorService,
    private brandService: BrandService
    ) {}

  ngOnInit(): void {
    this.getColors();
    this.getBrands();
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.colorLoaded = true;
    });
  }
    
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.brandLoaded = true;
    });
  }
}
