import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from 'src/app/models/creditCard/creditCard';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'https://localhost:44309/api/card/';
  constructor(private httpClient: HttpClient) {}

  CheckCreditCard(card: CreditCard, totalPrice:number): Observable<ResponseModel> {
    let newUrl = this.apiUrl + 'check/' + totalPrice;
    return this.httpClient.post<ResponseModel>(newUrl, card);
  }
}
