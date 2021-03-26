import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from 'src/app/models/color/color';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private apiUrl = 'https://localhost:44309/api/color/';
  constructor(private httpClient: HttpClient) {}

  getColors(): Observable<ListResponseModel<Color>> {
    let newUrl = this.apiUrl + 'list';
    return this.httpClient.get<ListResponseModel<Color>>(newUrl);
  }

  getColorById(colorId: number): Observable<ListResponseModel<Color>> {
    let newUrl = this.apiUrl + 'list' + colorId;
    return this.httpClient.get<ListResponseModel<Color>>(newUrl);
  }

  addColor(color: Color): Observable<ResponseModel> {
    let newUrl = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newUrl, color);
  }

  updateColor(color: Color): Observable<ResponseModel> {
    let newUrl = this.apiUrl + 'update';
    return this.httpClient.post<ResponseModel>(newUrl, color);
  }
}
