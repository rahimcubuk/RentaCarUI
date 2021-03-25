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
  colorForm: FormGroup;
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

  setCurrentColor(color: Color) {
    this.clearFilterFlag = false;
    this.currentColor = color;
  }

  clearFilter() {
    this.clearFilterFlag = true;
    this.getColors();
  }

  getCurrentColorClass(color: Color) {
    if (color == this.currentColor) {
      return 'list-group-item list-group-item-action active';
    }
    return 'list-group-item list-group-item-info';
  }

  createColorForm() {
    this.colorForm = this.formBuilder.group({
      colorName: ['', Validators.required],
    });
  }

  addColor() {
    if (this.colorForm.valid) {
      var data: Color = Object.assign({}, this.colorForm.value);
      this.colorService.addColor(data).subscribe(
        (response) => {
          this.toastrService.success(
            'Ekleme Islemi Tamamlandi',
            data.colorName
          );
          this.getColors();
        },
        (response) => {
          if (response.error.Errors.length > 0) {
            for (let i = 0; i < response.error.Errors.length; i++) {
              this.toastrService.error(
                response.error.Errors[i].ErrorMessage,
                'Ekleme Sirasinda Hata Olustu.'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error(
        'Girdiginiz Verilerin Dogrulugunu Kontrol Edin.',
        'Ekleme Sirasinda Hata Olustu.'
      );
    }
  }
}
