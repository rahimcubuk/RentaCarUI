import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ColorResponseModel } from 'src/app/models/color/colorResponseModel';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  colorListUrl = 'https://localhost:44309/api/color/list';
  constructor(private httpClient: HttpClient) {}

  getColors(): Observable<ColorResponseModel> {
    return this.httpClient.get<ColorResponseModel>(this.colorListUrl);
  }
}
