import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/customer/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user: User;

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.user = this.getUser();
  }

  getUser(): User {
    let decodeUser = this.authService.getUser();
    let user: User = {
      firstName: decodeUser.given_name.split(' ')[0],
      lastName: decodeUser.given_name.split(' ')[1],
      email: decodeUser.email,
      userId: decodeUser.nameid,
      password: '',
    };
    return user;
  }
}
