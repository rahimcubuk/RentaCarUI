import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalResponseModel } from 'src/app/models/rental/rentalResponseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  rentalListUrl = 'https://localhost:44309/api/rent/list';
  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<RentalResponseModel> {
    return this.httpClient.get<RentalResponseModel>(this.rentalListUrl);
  }
}
