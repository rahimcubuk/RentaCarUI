import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/car/car';
import { CarDetails } from 'src/app/models/car/carDetails';
import { DataResponseModel } from 'src/app/models/dataModel';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiUrl = 'https://localhost:44309/api/car/';
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<Car>> {
    let newUrl = this.apiUrl + 'list';
    return this.httpClient.get<ListResponseModel<Car>>(newUrl);
  }

  getAllDetail(): Observable<ListResponseModel<CarDetails>> {
    let newUrl = this.apiUrl + 'listdetails';
    return this.httpClient.get<ListResponseModel<CarDetails>>(newUrl);
  }

  getCarDetails(carId: number): Observable<DataResponseModel<CarDetails>> {
    let newUrl = this.apiUrl + 'details/' + carId;
    return this.httpClient.get<DataResponseModel<CarDetails>>(newUrl);
  }

  getCarById(carId: number): Observable<DataResponseModel<Car>> {
    let newUrl = this.apiUrl + carId;
    return this.httpClient.get<DataResponseModel<Car>>(newUrl);
  }

  getCarByColor(colorId: number): Observable<ListResponseModel<CarDetails>> {
    let newUrl = this.apiUrl + 'listbycolor/' + colorId;
    return this.httpClient.get<ListResponseModel<CarDetails>>(newUrl);
  }

  getCarByBrand(brandId: number): Observable<ListResponseModel<CarDetails>> {
    let newUrl = this.apiUrl + 'listbybrand/' + brandId;
    return this.httpClient.get<ListResponseModel<CarDetails>>(newUrl);
  }

  addCar(car: Car): Observable<ResponseModel> {
    let newUrl = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newUrl, car);
  }

  updateCar(car: Car): Observable<ResponseModel> {
    let newUrl = this.apiUrl + 'update';
    return this.httpClient.post<ResponseModel>(newUrl, car);
  }
}
