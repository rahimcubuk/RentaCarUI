import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';

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
    BrandFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
