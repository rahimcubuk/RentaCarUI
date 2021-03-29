import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenModel } from 'src/app/models/auth/tokenModel';
import { AuthService } from 'src/app/services/auth/auth.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { RegisterModel } from 'src/app/models/auth/registerModel';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  tokenData: TokenModel;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private storageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  register() {
    if (this.registerForm.valid) {
      var data: RegisterModel = Object.assign({}, this.registerForm.value);
      console.log(data);
      this.authService.register(data).subscribe(
        (response) => {
          this.toastrService.success(
            'Kayit Isleminiz Basarili',
            'Sayin: ' + data.firstName + ' ' + data.lastName
          );
          this.storageService.Set(response.data.token);
          this.router.navigate(['car']);
        },
        (response) => {
          if (response.error.Errors.length > 0) {
            for (let i = 0; i < response.error.Errors.length; i++) {
              this.toastrService.error(
                response.error.Errors[i].ErrorMessage,
                'Kayit Sirasinda Hata Olustu.'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error(
        'Girdiginiz Verilerin Dogrulugunu Kontrol Edin.',
        'Ekleme Sirasinda Hata Olustu.'
      );
    }
  }
}
