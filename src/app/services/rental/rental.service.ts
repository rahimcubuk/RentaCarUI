import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponseModel } from 'src/app/models/dataModel';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Rental } from 'src/app/models/rental/rental';
import { RentalDetail } from 'src/app/models/rental/rentalDetail';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  private apiUrl = 'https://localhost:44309/api/rent';
  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<ListResponseModel<RentalDetail>> {
    let newUrl = this.apiUrl + '/list';
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newUrl);
  }

  getRentalByCar(car: number): Observable<DataResponseModel<RentalDetail>> {
    let newUrl = this.apiUrl + '/check/' + car;
    return this.httpClient.get<DataResponseModel<RentalDetail>>(newUrl);
  }

  addRental(rental: Rental): Observable<ResponseModel> {
    let newPath = this.apiUrl + '/add';
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }
}
