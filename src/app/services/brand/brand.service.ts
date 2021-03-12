import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandResponseModel } from 'src/app/models/brand/brandResponseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  brandListUrl = 'https://localhost:44309/api/brand/list';
  constructor(private httpClient: HttpClient) {}

  getBrands(): Observable<BrandResponseModel> {
    return this.httpClient.get<BrandResponseModel>(this.brandListUrl);
  }
}
