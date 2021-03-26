import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/models/brand/brand';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private apiUrl = 'https://localhost:44309/api/brand/';
  constructor(private httpClient: HttpClient) {}

  getBrands(): Observable<ListResponseModel<Brand>> {
    let newUrl = this.apiUrl + 'list';
    return this.httpClient.get<ListResponseModel<Brand>>(newUrl);
  }

  addBrand(brand: Brand): Observable<ResponseModel> {
    let newUrl = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newUrl, brand);
  }

  updateBrand(brand: Brand): Observable<ResponseModel> {
    let newUrl = this.apiUrl + 'update';
    return this.httpClient.post<ResponseModel>(newUrl, brand);
  }
}
