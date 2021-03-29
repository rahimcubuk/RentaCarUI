import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private toastrService: ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.authService.logout();
    this.toastrService.info('Basariyla Cikis Yapildi');
    window.location.href='';
  }

}
