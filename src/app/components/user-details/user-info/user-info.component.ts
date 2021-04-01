import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/customer/user';
import { ToastrService } from 'ngx-toastr';
import { UserManagerService } from 'src/app/services/user/user-manager.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  userUpdateForm: FormGroup;
  @Input() user: User;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private userManager: UserManagerService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.userUpdateForm = this.formBuilder.group({
      email: [this.user.email, Validators.required],
      password: ['', Validators.required],
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      userId: [this.user.userId, Validators.required],
    });
  }

  save() {
    if (this.userUpdateForm.valid) {
      var data: User = Object.assign({}, this.userUpdateForm.value);
      data.userId = parseInt(data.userId?.toLocaleString());
      this.userManager.update(data);
    } else {
      this.toastrService.error(
        'Girdiginiz Verilerin Dogrulugunu Kontrol Edin.',
        'Ekleme Sirasinda Hata Olustu.'
      );
    }
  }
}
