import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer/customer';
import { User } from 'src/app/models/customer/user';
import { DataResponseModel } from 'src/app/models/dataModel';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiKey = 'https://localhost:44309/api/';
  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<ListResponseModel<Customer>> {
    let newUrl = this.apiKey + 'customer/list';
    return this.httpClient.get<ListResponseModel<Customer>>(newUrl);
  }

  getUsers(): Observable<ListResponseModel<User>> {
    let newUrl = this.apiKey + 'user/list';
    return this.httpClient.get<ListResponseModel<User>>(newUrl);
  }

  getCustomerById(id: number): Observable<DataResponseModel<Customer>> {
    let newUrl = this.apiKey + 'customer/list/' + id;
    return this.httpClient.get<DataResponseModel<Customer>>(newUrl);
  }

  updateCustomer(data: User): Observable<ResponseModel> {
    let newUrl = this.apiKey + 'user/update';
    return this.httpClient.post<ResponseModel>(newUrl, data);
  }
}
