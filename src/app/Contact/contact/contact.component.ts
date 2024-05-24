import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { ContactService } from '../contact.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { zoomIn, zoomOut } from 'ng-animate';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations: [
    trigger('zoomIn', [
      transition(
        ':enter',
        useAnimation(zoomIn, { params: { timing: 0.2, delay: 0 } })
      ),
      transition(
        ':leave',
        useAnimation(zoomOut, { params: { timing: 0.2, delay: 0 } })
      ),
    ]),
  ],
})
export class ContactComponent implements OnInit {
  constructor(
    private formbuilder: FormBuilder,
    private service: ContactService
  ) {}

  ngOnInit(): void {}

  contactUsForm = this.formbuilder.group({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phoneNo: new FormControl('', [Validators.required]),
    subject: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
  });

  taost: boolean = false;
  successToast: boolean = false;
  spinner: boolean = false;
  message:string
  submitContactUsForm(data: any) {
    if (this.contactUsForm.invalid) {
      this.taost = true;
      setTimeout(() => {
        this.taost = false;
      }, 3000);
    } else {
      this.spinner = true;
      const obj = {
        id: 0,
        name: data.fullName,
        phone: data.phoneNo,
        subject: data.subject,
        message: data.message,
        email: data.email,
      };
      this.service.postContact(obj).subscribe((res: any) => {
        var response = JSON.parse(res);
       this.message = response.Messages[0]
        this.contactUsForm.reset();
        this.successToast = true;
        setTimeout(() => {
          this.successToast = false;
          this.spinner = false
        }, 3000);
      });
    }
  }
}
