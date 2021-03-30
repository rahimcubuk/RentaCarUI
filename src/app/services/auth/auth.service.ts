import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LoginModel } from 'src/app/models/auth/loginModel';
import { RegisterModel } from 'src/app/models/auth/registerModel';
import { TokenModel } from 'src/app/models/auth/tokenModel';
import { DataResponseModel } from 'src/app/models/dataModel';
import { LocalStorageService } from '../storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:44309/api/auth/';
  constructor(
    private httpClient: HttpClient,
    private storageService: LocalStorageService
  ) {}

  private jwtHelper: JwtHelperService = new JwtHelperService();

  login(loginModel: LoginModel): Observable<DataResponseModel<TokenModel>> {
    let newUrl = this.apiUrl + 'login';
    return this.httpClient.post<DataResponseModel<TokenModel>>(
      newUrl,
      loginModel
    );
  }

  logout() {
    this.storageService.Clear();
  }

  register(registerModel: RegisterModel): Observable<DataResponseModel<TokenModel>> {
    let newUrl = this.apiUrl + 'register';
    return this.httpClient.post<DataResponseModel<TokenModel>>(
      newUrl,
      registerModel
    );
  }

  getUser() {
    const decodeToken = this.jwtHelper.decodeToken(this.getToken());
    return decodeToken;
  }

  private getToken() {
    return this.storageService.Get();
  }
}
