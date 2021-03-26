import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color/color';
import { ColorService } from 'src/app/services/color/color.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];
  currentColor: Color;
  colorAddForm: FormGroup;
  colorUpdateForm: FormGroup;
  clearFilterFlag = true;
  colorText = '';
  dataLoaded = false;

  constructor(
    private colorService: ColorService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getColors();
    this.createColorForm();
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded = true;
    });
  }

  setCurrentColor(color: Color, flag: boolean) {
    this.clearFilterFlag = flag;
    this.currentColor = color;
  }

  clearFilter() {
    this.clearFilterFlag = true;
    this.getColors();
  }

  getCurrentColorClass(color: Color) {
    if (color == this.currentColor && this.clearFilterFlag) {
      return 'list-group-item list-group-item-info active col-9';
    }
    return 'list-group-item list-group-item-info col-9';
  }

  createColorForm() {
    this.colorAddForm = this.formBuilder.group({
      colorName: ['', Validators.required],
    });
    this.colorUpdateForm = this.formBuilder.group({
      colorName: ['', Validators.required],
    });
  }

  validErrorControl(response: any) {
    if (response.error.Errors.length > 0) {
      for (let i = 0; i < response.error.Errors.length; i++) {
        this.toastrService.error(
          response.error.Errors[i].ErrorMessage,
          'Ekleme Sirasinda Hata Olustu.'
        );
      }
    }
  }

  addColor() {
    if (this.colorAddForm.valid) {
      var data: Color = Object.assign({}, this.colorAddForm.value);
      this.colorService.addColor(data).subscribe(
        (response) => {
          this.toastrService.success(
            'Ekleme Islemi Tamamlandi',
            data.colorName
          );
          this.getColors();
        },
        (response) => {
          this.validErrorControl(response);
        }
      );
    } else {
      this.toastrService.error(
        'Girdiginiz Verilerin Dogrulugunu Kontrol Edin.',
        'Ekleme Sirasinda Hata Olustu.'
      );
    }
  }

  updateColor() {
    if (this.colorUpdateForm.valid) {
      var data: Color = Object.assign({}, this.colorUpdateForm.value);
      data.colorId = this.currentColor.colorId;
      console.log(data);
      this.colorService.updateColor(data).subscribe(
        (response) => {
          this.toastrService.success(
            'Guncelleme Islemi Tamamlandi',
            data.colorName
          );
          this.getColors();
        },
        (response) => {
          this.validErrorControl(response);
        }
      );
    } else {
      var data: Color = Object.assign({}, this.colorUpdateForm.value);
      data.colorId = this.currentColor.colorId;
      console.log(data);
      this.toastrService.error(
        'Girdiginiz Verilerin Dogrulugunu Kontrol Edin.',
        'Guncelleme Sirasinda Hata Olustu.'
      );
    }
  }
}
