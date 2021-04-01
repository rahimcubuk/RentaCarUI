import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from 'src/app/models/creditCard/creditCard';
import { UserCardDetails } from 'src/app/models/creditCard/userCardDetails';
import { DataResponseModel } from 'src/app/models/dataModel';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private apiUserCardUrl = 'https://localhost:44309/api/usercard/';
  private apiCardUrl = 'https://localhost:44309/api/card/';
  constructor(private httpClient: HttpClient) {}

  getUserCards(user: number): Observable<ListResponseModel<UserCardDetails>> {
    let newUrl = this.apiUserCardUrl + 'detail/list?user=' + user;
    return this.httpClient.get<ListResponseModel<UserCardDetails>>(newUrl);
  }

  getUserCardById(card: number): Observable<DataResponseModel<UserCardDetails>> {
    let newUrl = this.apiUserCardUrl + 'detail/list/' + card;
    return this.httpClient.get<DataResponseModel<UserCardDetails>>(newUrl);
  }

  updateCreditCard(card: CreditCard): Observable<ResponseModel> {
    let newUrl = this.apiCardUrl + 'update';
    return this.httpClient.post<ResponseModel>(newUrl, card);
  }
}
