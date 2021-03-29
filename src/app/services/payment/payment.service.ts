import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from 'src/app/models/creditCard/creditCard';
import { FindexPoint } from 'src/app/models/creditCard/findexPoint';
import { DataResponseModel } from 'src/app/models/dataModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'https://localhost:44309/api/';
  constructor(private httpClient: HttpClient) {}

  CheckCreditCard(card: CreditCard, totalPrice:number): Observable<DataResponseModel<CreditCard>> {
    let newUrl = this.apiUrl + 'card/check/' + totalPrice;
    return this.httpClient.post<DataResponseModel<CreditCard>>(newUrl, card);
  }

  CheckFindexPoint(card:number): Observable<DataResponseModel<FindexPoint>> {
    let newUrl = this.apiUrl + 'findexpoint/check/' + card;
    return this.httpClient.get<DataResponseModel<FindexPoint>>(newUrl);
  }
}
