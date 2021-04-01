import { Component, Input, OnInit } from '@angular/core';
import { UserCardDetails } from 'src/app/models/creditCard/userCardDetails';
import { User } from 'src/app/models/customer/user';
import { CardService } from 'src/app/services/creditCard/card.service';
import { ToastrService } from 'ngx-toastr';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CreditCard } from 'src/app/models/creditCard/creditCard';
import { ErrorService } from 'src/app/services/error/error.service';
@Component({
  selector: 'app-user-cardinfo',
  templateUrl: './user-cardinfo.component.html',
  styleUrls: ['./user-cardinfo.component.css'],
})
export class UserCardinfoComponent implements OnInit {
  @Input() user: User;
  cardUpdateForm: FormGroup;
  userCards: UserCardDetails[] = [];
  currentCard: UserCardDetails;
  dataLoaded: boolean;
  editFlag: boolean = false;

  constructor(
    private cardService: CardService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.getUserCards();
  }

  createForm(card: UserCardDetails) {
    this.cardUpdateForm = this.formBuilder.group({
      nameOnTheCard: [card.nameOnTheCard, Validators.required],
      cardNumber: [card.cardNumber, Validators.required],
      cardCvv: [card.cardCvv, Validators.required],
      expirationMonth: [card.expirationMonth, Validators.required],
      expirationYear: [card.expirationYear, Validators.required],
    });
  }

  getUserCards() {
    this.cardService.getUserCards(this.user.userId).subscribe((response) => {
      this.userCards = response.data;
      this.dataLoaded = response.success;
    });
  }

  updateCard(card: UserCardDetails) {
    this.editFlag = true;
    this.currentCard = card;
    this.createForm(card);
  }

  save() {
    if (this.cardUpdateForm.valid) {
      var data: CreditCard = Object.assign({}, this.cardUpdateForm.value);
      data.id = this.currentCard.cardId;
      console.log(data);
      this.cardService.updateCreditCard(data).subscribe(
        (response) => {
          this.toastrService.info('Kart Basariyla Guncellendi');
          this.getUserCards();
          this.editFlag = false;
        },
        (response) => {
          this.errorService.validationError(response);
        }
      );
    } else {
      this.toastrService.error(
        'Girilen bilgilerin dogrulugunu kontrol ediniz.'
      );
    }
  }
}
