import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}

  reload(second: number, routeKey: string) {
    console.log(second);
    if (second != 0) {
      setTimeout(() => {
        window.location.href = routeKey;
      }, second * 1000);
    }
  }

  checkRent(response: any): boolean {
    if (response.data.returnDate != null) {
      var returnDateTime = new Date(response.data.returnDate.toString());
      var rentDateTime = new Date(response.data.rentDate.toString());
      var todayTime = new Date(Date.toString());

      if (rentDateTime < todayTime && todayTime < returnDateTime) return true;
      else return false;
    } else return true;
  }
}
