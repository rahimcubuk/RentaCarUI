import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RegisterModel } from 'src/app/models/auth/registerModel';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { UserManagerService } from 'src/app/services/user/user-manager.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private helper: HelperService,
    private userManager: UserManagerService
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
      this.userManager.register(data,1);
    } else {
      this.toastrService.error(
        'Girdiginiz Verilerin Dogrulugunu Kontrol Edin.',
        'Ekleme Sirasinda Hata Olustu.'
      );
    }
  }
}
