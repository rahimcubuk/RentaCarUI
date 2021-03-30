import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}

  reload(second: number, routeKey:string) {
    console.log(second);
    if (second != 0) {
      setTimeout(() => {window.location.href = routeKey;}, second * 1000);
    }
  }
}
