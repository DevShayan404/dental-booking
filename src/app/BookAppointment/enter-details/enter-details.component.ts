import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BookAppointmentServiceService } from '../book-appointment-service.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import * as creditCardType from 'credit-card-type';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-enter-details',
  templateUrl: './enter-details.component.html',
  styleUrls: ['./enter-details.component.css'],
  providers: [MessageService],
})
export class EnterDetailsComponent implements OnInit {
  getPatientNumber: any;
  patientRelation: any;
  doctorName: string;
  patientName: string;
  slotTime: any;
  patientId: number;
  constructor(
    private service: BookAppointmentServiceService,
    private route: Router,
    private datePipe: DatePipe,
    private formbuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.doctorName = localStorage.getItem('doctorName')!;
    this.patientId = +localStorage.getItem('patientId')!;
    this.patientParentId = this.patientId;
    console.log(this.patientParentId);
  }

  appointmentData: any;
  drData: any;
  hospitalDetails: any;
  fees: any[];
  ngOnInit(): void {
    this.appointmentData = this.service.getAppointmentObj();
    // console.log(this.appointmentData);

    this.drData = this.service.getDrData();
    this.hospitalDetails = this.service.getHospitalDetails();
    var vendorId = this.drData.VendorId;
    this.service.getFees(vendorId).subscribe((res: any) => {
      this.fees = res?.Result;
      // console.log(this.fees);

      this.calculateTotalAmount();
    });
    this.getPayementList();
    this.getSomeOneList();
    this.validateForm('cartNumber', 19);
    this.validateForm('mmyy', 5);
    this.validateForm('cvv', 3);
    this.validateSomeOneForm('phoneNo', 10);
  }
  totalAmount: number = 0;
  calculateTotalAmount(): void {
    this.totalAmount = this.fees.reduce(
      (total, item) => total + item.Amount,
      0
    );
  }
  cardList: any[];
  skeleton: boolean = false;
  getPayementList() {
    this.skeleton = true;
    this.service.getPayment(this.patientId).subscribe((res: any) => {
      this.cardList = res.Result;
      this.skeleton = false;
      if (this.cardList?.length > 0) {
        this.cardFormOpen = false;
        this.selectedCard = this.cardList[0]?.Id;
      } else {
        this.cardFormOpen = true;
      }
    });
  }

  showModalSomeOne: boolean = false;
  someoneElse() {
    this.showModalSomeOne = true;
  }

  cardFormOpen: boolean;
  openCardForm() {
    this.cardFormOpen = !this.cardFormOpen;
    if (this.cardFormOpen === true) {
      this.selectedCard = null;
    }
  }

  selectedCard: number | null;
  selectCard(data: any) {
    this.selectedCard = data.Id;
  }

  creditCartForm = this.formbuilder.group({
    cartHolderName: [null, [Validators.required]],
    cartNumber: [null, [Validators.required]],
    mmyy: [null, [Validators.required]],
    cvv: [null, [Validators.required]],
  });
  validateForm(controlName: string, maxLength: number) {
    const control = this.creditCartForm.get(controlName);
    if (control) {
      control.valueChanges.subscribe((value) => {
        if (value?.length > maxLength) {
          const truncatedValue = value.slice(0, -1);
          control.setValue(truncatedValue, { emitEvent: false });
        }
      });
    }
  }
  cardType: string;
  onCardNumberInput(event: any) {
    const input = event.target as HTMLInputElement;
    let cardNumber = input.value.replace(/\s/g, '');
    const regex = /^[0-9]*$/;

    if (cardNumber === '') {
      // Input is empty, show the default image
      const cardTypeIcon = document.getElementById(
        'cardTypeIcon'
      ) as HTMLImageElement;
      cardTypeIcon.src = 'assets/Images/defaultCart.png';
    } else if (!regex.test(cardNumber)) {
      cardNumber = cardNumber.replace(/[^0-9]/g, '');
      input.value = this.formatCardNumber(cardNumber);
    } else {
      input.value = this.formatCardNumber(cardNumber);
      const cardTypeInfo = creditCardType(cardNumber);
      // console.log(cardTypeInfo);

      const cardTypeIcon = document.getElementById(
        'cardTypeIcon'
      ) as HTMLImageElement;

      if (cardTypeInfo.length > 0) {
        this.cardType = cardTypeInfo[0].type;

        switch (this.cardType) {
          case 'visa':
            cardTypeIcon.src = 'assets/Images/visaCard.png';
            break;
          case 'mastercard':
            cardTypeIcon.src = 'assets/Images/masterCard.png';
            break;
          default:
            cardTypeIcon.src = 'assets/Images/defaultCart.png';
            break;
        }
      }
    }
  }

  formatCardNumber(cardNumber: string): string {
    return cardNumber.replace(/(\d{4})/g, '$1 ').trim();
  }
  onMMYYInput(event: any) {
    const input = event.target as HTMLInputElement;
    let mmYY = input.value.replace(/\s/g, '').replace(/\//g, '');
    const regex = /^[0-9]*$/;

    if (!regex.test(mmYY)) {
      mmYY = mmYY.replace(/[^0-9]/g, '');
      input.value = this.formatMMYY(mmYY);
    } else {
      input.value = this.formatMMYY(mmYY);
    }
  }

  formatMMYY(mmYY: string): string {
    if (mmYY.length > 2) {
      mmYY = mmYY.slice(0, 2) + '/' + mmYY.slice(2);
    }
    return mmYY;
  }
  onPhoneNumberInput(event: any) {
    const input = event.target as HTMLInputElement;
    const regex = /^[0-9]*$/;
    const value = input.value;

    if (!regex.test(value)) {
      input.value = value.replace(/[^0-9]/g, '');
    }
  }

  cartSave: boolean = false;
  saveCartId: number = 0;
  spinner: boolean = false;
  saveCart() {
    this.cartSave = !this.cartSave;
    if (this.cartSave === true) {
      this.saveCartId = 1;
    } else {
      this.saveCartId = 0;
    }
  }

  submitCreditCartForm(data: any) {
    this.spinner = true;

    if (this.selectedCard === undefined || this.selectedCard === null) {
      // when user not save cart
      if (this.creditCartForm.valid) {
        const numberWithoutSpaces = data.cartNumber.replace(/\s/g, '');
        const cartNumber = Number(numberWithoutSpaces);
        const mmyy = this.formatValue(data.mmyy);
        const obj = {
          doctorVendorId: this.appointmentData.DoctorVendorId,
          patientId: this.patientId,
          appointment: this.appointmentData.Appointment,
          initialFees: this.totalAmount,
          createdBy: null,
          createdOn: null,
          patientCardDetail: {
            patientId: this.patientParentId,
            cardNumber: cartNumber,
            cardHolderName: data.cartHolderName,
            cvv: data.cvv,
            cardType: this.cardType,
            expiry: mmyy,
          },
          parentId: +this.patientParentId,
        };
        console.log(obj);
        this.service.bookSlot(this.saveCartId, obj).subscribe((res: any) => {
          var response = JSON.parse(res);
          var code = response.Code;
          var message = response.Messages;
          console.log(response);

          this.spinner = false;
          if (code === 0) {
            this.messageService.add({
              key: 'toast1',
              severity: 'success',
              detail: message,
            });
            setTimeout(() => {
              this.route.navigate(['/']);
            }, 2000);
          } else {
            this.messageService.add({
              key: 'toast2',
              severity: 'error',
              detail: message,
            });
          }
          this.creditCartForm.reset();
          this.cartSave = false;
        });
      } else {
        this.spinner = false;
        this.messageService.add({
          key: 'toast2',
          severity: 'error',
          detail: 'Please enter cart details',
        });
      }
      // when user select save cart list
    } else {
      const obj = {
        doctorVendorId: this.appointmentData.DoctorVendorId,
        patientId: this.patientId,
        appointment: this.appointmentData.Appointment,
        initialFees: this.totalAmount,
        createdBy: null,
        createdOn: null,
        patientCardDetail: {
          patientId: this.patientParentId,
          cardNumber: 'string',
          cardHolderName: 'string',
          cvv: 'string',
          cardType: 'string',
          expiry: 'string',
        },
        parentId: this.patientParentId,
      };
      console.log(obj);
      this.service
        .bookSlotWithSaveCart(this.selectedCard, obj)
        .subscribe((res: any) => {
          var response = JSON.parse(res);
          var code = response.Code;
          var message = response.Messages;
          console.log(response);
          this.spinner = false;
          if (code === 0) {
            this.messageService.add({
              key: 'toast1',
              severity: 'success',
              detail: message,
            });
            setTimeout(() => {
              this.route.navigate(['/']);
            }, 2000);
          } else {
            this.messageService.add({
              key: 'toast2',
              severity: 'error',
              detail: message,
            });
          }
          this.creditCartForm.reset();
          this.cartSave = false;
        });
    }
  }
  private formatValue(value: string): string {
    // Assuming the input format is always "MM/YY" (e.g., "09/43")
    const parts = value.split('/');
    const month = parts[0];
    const year = parts[1];

    // Pad the month with leading zeros if necessary
    const formattedMonth = month.length === 1 ? `0${month}` : month;

    return formattedMonth + year;
  }

  appointmentForList: any[];
  patientParentId: number;
  getSomeOneList() {
    this.service.getsomeOneList(this.patientId).subscribe((res: any) => {
      this.appointmentForList = res?.Result;
      this.relationId = res?.Result[0]?.Id;
      this.patientParentId = res?.Result[0]?.ParentId;
      this.patientRelation = res?.Result[0]?.Relation;
      this.patientName = res?.Result[0]?.Name;
      this.getPatientNumber = res?.Result[0]?.PhoneNumber;
    });
  }
  relationId: any;
  selectRelation(data: any) {
    console.log(data);

    this.patientParentId = data.ParentId;
    this.relationId = data.Id;
    this.patientId = this.relationId;
    this.patientRelation = data.Relation;
    this.patientName = data.Name;
    this.getPatientNumber = data.PhoneNumber;
  }
  showFlag: boolean = false;
  onInputFocus() {
    this.showFlag = true;
  }
  onInputBlur() {
    const phoneNumberControl = this.SomeOneForm.get('phoneNo') as FormControl;
    if (phoneNumberControl) {
      this.showFlag = phoneNumberControl?.value?.trim()?.length > 0;
    }
  }
  validateSomeOneForm(controlName: string, maxLength: number) {
    const control = this.SomeOneForm.get(controlName);
    if (control) {
      control.valueChanges.subscribe((value) => {
        if (value?.length > maxLength) {
          const truncatedValue = value.slice(0, -1);
          control.setValue(truncatedValue, { emitEvent: false });
        }
      });
    }
  }
  selectedGender: string = 'male';
  selectedGenderId: number = 1;
  selectGender(gender: string) {
    this.selectedGender = gender;
    if (this.selectedGender === 'male') {
      this.selectedGenderId = 1;
    } else if (this.selectedGender === 'female') {
      this.selectedGenderId = 2;
    }
    console.log(this.selectedGenderId);
  }
  SomeOneForm = this.formbuilder.group({
    patientName: [null, [Validators.required]],
    phoneNo: [null, [Validators.required]],
    Relation: [null, [Validators.required]],
  });

  someOneSpinner: boolean = false;
  // someOneSpan: boolean = false;
  submitSomeOneForm(data: any) {
    if (this.SomeOneForm.valid) {
      this.someOneSpinner = true;
      const obj = {
        name: data.patientName,
        phoneNumber: +data.phoneNo,
        gender: this.selectedGenderId,
        relation: data.Relation,
        parentId: this.patientId,
      };
      // console.log(obj);
      this.service.someOnePostForm(obj).subscribe((res: any) => {
        // this.someOneSpan = true;
        this.someOneSpinner = false;
        // localStorage.setItem('someOneSpan', this.someOneSpan.toString());
        var response = JSON.parse(res);
        var message = response.Messages;
        this.spinner = false;
        this.messageService.add({
          key: 'toast1',
          severity: 'success',
          detail: message,
        });
        this.SomeOneForm.reset();
        this.showFlag = false;
        this.showModalSomeOne = false;
        this.getSomeOneList();
      });
    } else {
      this.messageService.add({
        key: 'toast2',
        severity: 'error',
        detail: 'Please fill out the form.',
      });
    }
  }

  confirmPopup: boolean = false;
}
