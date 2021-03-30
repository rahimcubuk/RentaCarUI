import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LoginModel } from 'src/app/models/auth/loginModel';
import { RegisterModel } from 'src/app/models/auth/registerModel';
import { User } from 'src/app/models/customer/user';
import { AuthService } from '../auth/auth.service';
import { CustomerService } from '../customer/customer.service';
import { ErrorService } from '../error/error.service';
import { HelperService } from '../helper/helper.service';
import { LocalStorageService } from '../storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserManagerService {
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private storageService: LocalStorageService,
    private customerService: CustomerService,
    private errorService: ErrorService,
    private helper: HelperService
  ) {}

  login(data: LoginModel, second: number) {
    this.authService.login(data).subscribe(
      (response) => {
        this.toastrService.info('Basariyla Giris Yapildi.');
        this.storageService.Set(response.data.token);
        this.helper.reload(second, 'car');
      },
      (response) => {
        this.toastrService.error(response.error);
      }
    );
  }

  register(data: RegisterModel, second: number) {
    this.authService.register(data).subscribe(
      (response) => {
        this.toastrService.success(
          'Kayit Isleminiz Basarili',
          'Sayin: ' + data.firstName + ' ' + data.lastName
        );
        this.storageService.Set(response.data.token);
        this.helper.reload(second, 'car');
      },
      (response) => {
        this.errorService.validationError(response);
      }
    );
  }

  update(data: User) {
    this.customerService.updateCustomer(data).subscribe(
      (response) => {
        this.toastrService.success(
          'Kayit Isleminiz Basarili',
          'Sayin: ' + data.firstName + ' ' + data.lastName
        );
        this.relogin(data);
      },
      (response) => {
        this.errorService.validationError(response);
      }
    );
  }

  private relogin(user: User) {
    this.authService.logout();
    let data: LoginModel = {
      email: user.email,
      password: user.password,
    };
    this.login(data, 0);
    this.helper.reload(1, 'user/' + user.firstName +' ' + user.lastName);
  }
}
