import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponseModel } from 'src/app/models/dataModel';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Rental } from 'src/app/models/rental/rental';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:44309/api/rent';
  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<ListResponseModel<Rental>> {
    let newUrl = this.apiUrl + '/list';
    return this.httpClient.get<ListResponseModel<Rental>>(newUrl);
  }

  getRentalByCar(car: number): Observable<DataResponseModel<Rental>> {
    let newUrl = this.apiUrl + '/list/' + car;
    return this.httpClient.get<DataResponseModel<Rental>>(newUrl);
  }
}
