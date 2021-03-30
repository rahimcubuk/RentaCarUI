import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand/brand';
import { Color } from 'src/app/models/color/color';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BrandService } from 'src/app/services/brand/brand.service';
import { ColorService } from 'src/app/services/color/color.service';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css'],
})
export class NavigatorComponent implements OnInit {
  colors: Color[] = [];
  brands: Brand[] = [];
  userName?: string;
  isAuthFlag = false;
  colorLoaded = false;
  brandLoaded = false;
  
  constructor(
    private colorService: ColorService,
    private brandService: BrandService,
    private storageService: LocalStorageService,
    private toastrService: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getColors();
    this.getBrands();
    this.isAuthenticated();
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

  isAuthenticated() {
    this.isAuthFlag = this.storageService.isAuthenticated();
    if (this.isAuthFlag) {
      this.userName = this.authService.getUser().given_name;
    }
  }

  logout(){
    this.authService.logout();
    this.toastrService.info('Basariyla Cikis Yapildi');
    window.location.href='';
  }
}
