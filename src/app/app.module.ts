import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColorComponent } from './components/color/color.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarComponent } from './components/car/car.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { NavigatorComponent } from './components/navigator/navigator.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarFilterPipe } from './pipes/filterPipes/carPipes/car-filter.pipe';
import { CarImagesPipe } from './pipes/imagePipe/car-images.pipe';
import { ColorFilterPipe } from './pipes/filterPipes/colorPipes/color-filter.pipe';
import { BrandFilterPipe } from './pipes/filterPipes/brandPipes/brand-filter.pipe';
import { PaymentComponent } from './components/payment/payment.component';
import { RentCarComponent } from './components/rent-car/rent-car.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { from } from 'rxjs';
import { UserInfoComponent } from './components/user-details/user-info/user-info.component';
import { UserCardinfoComponent } from './components/user-details/user-cardinfo/user-cardinfo.component';

@NgModule({
  declarations: [
    AppComponent,
    ColorComponent,
    BrandComponent,
    CarComponent,
    CustomerComponent,
    RentalComponent,
    NavigatorComponent,
    CarDetailsComponent,
    CarFilterPipe,
    CarImagesPipe,
    ColorFilterPipe,
    BrandFilterPipe,
    PaymentComponent,
    RentCarComponent,
    CarAddComponent,
    CarUpdateComponent,
    LoginComponent,
    RegisterComponent,
    UserDetailsComponent,
    UserInfoComponent,
    UserCardinfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
