import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarComponent } from './components/car/car.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentCarComponent } from './components/rent-car/rent-car.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },
  { path: 'car', component: CarComponent },
  { path: 'car/add', component: CarAddComponent },
  { path: 'car/listbycolor/:colorId', component: CarComponent },
  { path: 'car/listbybrand/:brandId', component: CarComponent },
  { path: 'car/details/:carId', component: CarDetailsComponent },
  { path: 'rent/car/:carId', component: RentCarComponent },
  { path: 'payment/:rental', component: PaymentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
