import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarResponseModel } from 'src/app/models/car/carResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  carListUrl = 'https://localhost:44309/api/car/list';
  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<CarResponseModel> {
    return this.httpClient.get<CarResponseModel>(this.carListUrl);
  }
}
