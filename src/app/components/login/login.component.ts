import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/auth/loginModel';
import { TokenModel } from 'src/app/models/auth/tokenModel';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { UserManagerService } from 'src/app/services/user/user-manager.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  tokenData: TokenModel;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private helper: HelperService,
    private userManager: UserManagerService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      var data: LoginModel = Object.assign({}, this.loginForm.value);
      this.userManager.login(data, 1);
    } else {
      this.toastrService.error('Hatali ya da eksik bilgi girdiniz.');
    }
  }
}
