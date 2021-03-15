import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from 'src/app/models/color/color';
import { ListResponseModel } from 'src/app/models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  apiUrl = 'https://localhost:44309/api/color/';
  constructor(private httpClient: HttpClient) {}

  getColors(): Observable<ListResponseModel<Color>> {
    let newUrl = this.apiUrl+'list';
    return this.httpClient.get<ListResponseModel<Color>>(newUrl);
  }
  
  getColorById(colorId: number): Observable<ListResponseModel<Color>> {
    let newUrl = this.apiUrl+'list'+colorId
    return this.httpClient.get<ListResponseModel<Color>>(newUrl);
  }
}
