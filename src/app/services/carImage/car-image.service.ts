import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from 'src/app/models/car/carImage';
import { ListResponseModel } from 'src/app/models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarImageService {
  private apiUrl = 'https://localhost:44309/api/carimages/';
  constructor(private httpClient: HttpClient) {}

  getImagesByCar(car: number): Observable<ListResponseModel<CarImage>> {
    let newUrl = this.apiUrl + 'listbycar/' + car;
    return this.httpClient.get<ListResponseModel<CarImage>>(newUrl);
  }
}
