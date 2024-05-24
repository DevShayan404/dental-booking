import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../history.service';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class HistoryComponent implements OnInit {
  historyList: any[];
  constructor(
    private service: HistoryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.slotHistory();
  }
  skeleton: boolean = true;
  slotHistory() {
    var patientId = localStorage.getItem('patientId');
    this.service.getHistory(patientId, this.toggle).subscribe((res: any) => {
      this.historyList = res.Result;
      console.log(this.historyList);

      this.skeleton = false;
    });
  }
  checked: boolean = true;
  toggle: number = 2;
  onSwitchChange(): void {
    if (this.checked) {
      this.toggle = 2;
      this.skeleton = true;
      this.slotHistory();
    } else {
      this.toggle = 1;
      this.skeleton = true;
      this.slotHistory();
    }
  }

  cancelAppointment(list: any) {
    // const createdOn = new Date(list.CreatedOn);
    // const currentTime = new Date();
    // const timeDifference = currentTime.getTime() - createdOn.getTime();
    // const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000;
    // console.log(timeDifference > twentyFourHoursInMilliseconds);
    // if (timeDifference < twentyFourHoursInMilliseconds) {
    this.confirmationService.confirm({
      message: 'Do you want to Cancel this Appointment?',
      header: 'Cancel Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.skeleton = true;
        this.service.cancelAppointment(list.Id).subscribe((res: any) => {
          console.log(res);

          this.slotHistory();
          this.messageService.add({
            severity: 'info',
            summary: 'Canceled',
            detail: res?.Messages,
          });
        });
      },
      // reject: (type:any) => {
      //     switch (type: ConfirmEventType) {
      //         case ConfirmEventType.REJECT:
      //             this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      //             break;
      //         case ConfirmEventType.CANCEL:
      //             this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
      //             break;
      //     }
      // }
    });
    // } else {
    //   console.log('not cancel');
    // }
  }

  reviewModal: boolean = false;
  reviewModalData!: any;
  openReviewModal(data: any) {
    this.reviewModalData = data!;
    console.log(data);
    var doctorId = +data?.DoctorVendor?.Doctor?.Id;
    var vendorId = +data?.DoctorVendor?.Vendor?.Id;
    var appointmentId = +data?.Id;
    var PatientId = +data.ParentId;
    // this.successHospital = false;
    // this.successdoctor = false;

    this.service
      .checkReview(doctorId, vendorId, appointmentId, PatientId)
      .subscribe((res: any) => {
        console.log(res?.Code);
        let code = res?.Code;
        if (code === 100) {
          this.successHospital = true;
          this.successdoctor = true;
        } else if (code === 101) {
          this.successdoctor = true;
        } else if (code === 102) {
          this.successHospital = true;
        } else if (code === 1) {
          this.successHospital = false;
          this.successdoctor = false;
        }
        this.reviewModal = true;
      });
  }
  HospitalValue!: number;
  hospitalRemarks: string;
  DoctorValue!: number;
  DoctorRemarks: string;
  activeIndex: number = 0;
  spinner: boolean = false;
  successHospital: boolean = false;
  successdoctor: boolean = false;
  submitReviewHospital(data: any) {
    if (
      this.HospitalValue !== undefined &&
      this.hospitalRemarks !== undefined
    ) {
      this.spinner = true;
      const obj = {
        remarks: this.hospitalRemarks,
        rating: this.HospitalValue,
        reviewedRole: 'Vendor',
        reviewerRole: 'Patient',
        reviewerId: data.ParentId,
        reviewedId: data?.DoctorVendor?.Vendor?.Id,
        createdOn: '2023-11-14T10:48:28.679Z',
        appointmentId: data.Id,
        isDoctorReviewed: 0,
        isVendorReviewed: 1,
      };
      this.service.review(obj).subscribe((res) => {
        console.log(res);
        this.spinner = false;
        this.successHospital = true;
      });
      console.log(obj);
    }
  }
  submitReviewDoctor(data: any) {
    if (this.DoctorRemarks !== undefined && this.DoctorValue !== undefined) {
      this.spinner = true;
      const obj = {
        remarks: this.DoctorRemarks,
        rating: this.DoctorValue,
        reviewedRole: 'Doctor',
        reviewerRole: 'Patient',
        reviewerId: data.ParentId,
        reviewedId: data?.DoctorVendor?.Doctor?.Id,
        createdOn: '2023-11-14T10:48:28.679Z',
        appointmentId: data.Id,
        isDoctorReviewed: 1,
        isVendorReviewed: 0,
      };
      console.log(obj);
      this.service.review(obj).subscribe((res) => {
        console.log(res);
        this.spinner = false;
        this.successdoctor = true;
      });
    }
  }
}
