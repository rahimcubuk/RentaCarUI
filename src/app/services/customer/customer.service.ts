import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerResonseModel } from 'src/app/models/customer/customerResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  customerListUrl = 'https://localhost:44309/api/customer/list';
  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<CustomerResonseModel> {
    return this.httpClient.get<CustomerResonseModel>(this.customerListUrl);
  }
}
