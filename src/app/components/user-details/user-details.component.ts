import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/customer/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { TokenModel } from 'src/app/models/auth/tokenModel';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';
import { RegisterModel } from 'src/app/models/auth/registerModel';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { LoginModel } from 'src/app/models/auth/loginModel';
import { UserManagerService } from 'src/app/services/user/user-manager.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  userUpdateForm: FormGroup;
  tokenData: TokenModel;
  firstname: string;
  lastname: string;
  email: string;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private userManager: UserManagerService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  getUser():User {
    let decodeUser = this.authService.getUser();
    let user:User = {
      firstName: decodeUser.given_name.split(' ')[0],
      lastName: decodeUser.given_name.split(' ')[1],
      email: decodeUser.email,
      userId:decodeUser.nameid,
      password:''
    };
    return user;
  }

  createForm() {
    let user = this.getUser();
    this.userUpdateForm = this.formBuilder.group({
      email: [user.email, Validators.required],
      password: ['', Validators.required],
      firstName: [user.firstName, Validators.required],
      lastName: [user.lastName, Validators.required],
      userId: [user.userId, Validators.required],
    });
  }

  save() {
    if (this.userUpdateForm.valid) {
      var data: User = Object.assign({}, this.userUpdateForm.value);
      data.userId = parseInt(data.userId?.toLocaleString());
      // this.customerService.updateCustomer(data).subscribe((response)=>{
      //   this.toastrService.success(
      //     'Kayit Isleminiz Basarili',
      //     'Sayin: ' + data.firstName + ' ' + data.lastName
      //   );
      //   this.reload(data);
      // },(response)=>{
      //   if (response.error.Errors.length > 0) {
      //     for (let i = 0; i < response.error.Errors.length; i++) {
      //       this.toastrService.error(
      //         response.error.Errors[i].ErrorMessage,
      //         'Kayit Sirasinda Hata Olustu.'
      //       );
      //     }
      //   }
      // })
      this.userManager.update(data);
    } else {
      this.toastrService.error(
        'Girdiginiz Verilerin Dogrulugunu Kontrol Edin.',
        'Ekleme Sirasinda Hata Olustu.'
      );
    }
  }
}
