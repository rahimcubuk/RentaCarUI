import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private toastrService: ToastrService) {}

  validationError(response: any) {
    if (response.error.Errors.length > 0) {
      for (let i = 0; i < response.error.Errors.length; i++) {
        this.toastrService.error(
          response.error.Errors[i].ErrorMessage,
          'Kayit Sirasinda Hata Olustu.'
        );
      }
    }
  }
}
