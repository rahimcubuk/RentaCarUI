import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer/customer';
import { DataResponseModel } from 'src/app/models/dataModel';
import { ListResponseModel } from 'src/app/models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiKey = 'https://localhost:44309/api/customer/';
  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<ListResponseModel<Customer>> {
    let newUrl = this.apiKey + 'list';
    return this.httpClient.get<ListResponseModel<Customer>>(newUrl);
  }

  getCustomerById(id: number): Observable<DataResponseModel<Customer>> {
    let newUrl = this.apiKey + 'list/' + id;
    return this.httpClient.get<DataResponseModel<Customer>>(newUrl);
  }
}
