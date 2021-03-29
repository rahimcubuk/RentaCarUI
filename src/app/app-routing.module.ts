import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentCarComponent } from './components/rent-car/rent-car.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login/login.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },
  { path: 'car', component: CarComponent },
  { path: 'car/add', component: CarAddComponent, canActivate:[LoginGuard]},
  { path: 'car/update/:carId', component: CarUpdateComponent, canActivate:[LoginGuard] },
  { path: 'car/listbycolor/:colorId', component: CarComponent },
  { path: 'car/listbybrand/:brandId', component: CarComponent },
  { path: 'car/details/:carId', component: CarDetailsComponent },
  { path: 'rent/car/:carId', component: RentCarComponent, canActivate:[LoginGuard] },
  { path: 'payment/:rental', component: PaymentComponent, canActivate:[LoginGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent,canActivate:[LoginGuard]},
  { path: 'register', component: RegisterComponent},
  { path: 'rentals', component: RentalComponent,canActivate:[LoginGuard]},
  { path: 'customers', component: CustomerComponent,canActivate:[LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
