import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookAppointmentServiceService } from '../book-appointment-service.service';
import { DatePipe } from '@angular/common';
import {
  ScrollToService,
  ScrollToConfigOptions,
} from '@nicky-lenaers/ngx-scroll-to';
import { NavbarService } from 'src/app/Navbr/navbar.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css'],
})
export class ViewProfileComponent implements OnInit {
  mapOptions: google.maps.MapOptions = {
    zoom: 14,
    draggable: false,
    mapTypeControl: false,
    zoomControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  };
  aboutMapOptions: google.maps.MapOptions = {
    zoom: 16,
    mapTypeControl: false,
  };
  rating: number = 5;
  activeIndex: number = 0;

  drList: any;
  selectedDr: any;
  hospitalDetails: any;
  lat: number;
  lng: number;
  mapCenter: any;
  markerPositions: any;
  Reviews: any;
  hospitalDetailObject: any;
  skeleton: boolean = true;
  vendorId: number;
  targetDoctorDiv: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: BookAppointmentServiceService,
    private scrollToService: ScrollToService,
    private datePipe: DatePipe,
    private navService: NavbarService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.vendorId = params['id'];

      this.service.getDrProfile(this.vendorId).subscribe((res: any) => {
        var result = res?.Result;
        // console.log(result);

        this.hospitalDetails = result;
        this.hospitalDetailObject = [
          {
            Address1: this.hospitalDetails[0].Address1,
            Address2: this.hospitalDetails[0].Address2,
            BusinessName: this.hospitalDetails[0].BusinessName,
            ProfilePic: this.hospitalDetails[0].ProfilePic,
          },
        ];
        this.lat = this.hospitalDetails[0]?.Lat;
        this.lng = this.hospitalDetails[0]?.Long;
        this.selectedDr = this.hospitalDetails[0]?.DoctorVendor[0];
        this.mapCenter = { lat: +this.lat, lng: +this.lng };
        this.markerPositions = { lat: +this.lat, lng: +this.lng };
        this.skeleton = false;
        this.filterAppointmentsByDate();
        this.targetDoctorDiv = this.service.targetDoctorDiv;
        if (this.skeleton === false) {
          setTimeout(() => {
            const config: ScrollToConfigOptions = {
              target: this.targetDoctorDiv,
              duration: 500,
            };
            this.scrollToService.scrollTo(config);
            // console.log(this.targetDoctorDiv);
          }, 200);
        }
      });
    });
    this.service.getReviews(this.vendorId).subscribe((res: any) => {
      this.Reviews = res?.Result;
      console.log(this.Reviews);
      this.averageRating = this.calculateAverageRating();
    });
    this.navService.setNotFixedNav(true);
  }
  selectedDate: Date;
  averageRating: any;
  patientId: number;
  ngOnInit(): void {
    this.generateCalendar();
    this.selectedDate = new Date();
    this.dateFormat();
    this.patientId = +localStorage.getItem('userName')!;
  }
  items = [
    { label: 'Need to know' },
    { label: 'Hospital Details' },
    { label: 'Doctors' },
    { label: 'Reviews' },
  ];
  tabClick(event: any) {
    // console.log('scrollTo', event.target.innerText);

    const config: ScrollToConfigOptions = {
      target: event.target.innerText,
      duration: 500,
      // easing: 'easeOutElastic',
    };

    this.scrollToService.scrollTo(config);
  }
  calculateAverageRating() {
    const totalRating = this.Reviews?.reduce(
      (acc: any, review: any) => acc + review.Rating,
      0
    );
    return this.Reviews?.length > 0
      ? Math.round(totalRating / this.Reviews?.length)
      : 0;
  }

  calculateReviewCountByRating(rating: number) {
    return this.Reviews?.filter((review: any) => review.Rating === rating)
      ?.length;
  }
  selectDrInList(data: any) {
    this.selectedDr = data;
    console.log(this.selectedDr);

    this.ngOnInit();
    this.filterAppointmentsByDate();
    this.viewAll = false;
    this.service.setDrData(this.selectedDr);
  }

  formattedDate: any;
  dateFormat() {
    this.formattedDate =
      this.datePipe.transform(this.selectedDate, 'yyyy-MM-ddTHH:mm:ss') || '';
  }
  finalResult: any = [];
  async getUniqueDates() {
    const uniqueDates: { [key: string]: boolean } = {}; // Type annotation for uniqueDates

    for (const date of this.dateRange) {
      const datePart = date.split('T')[0];

      if (!uniqueDates[datePart]) {
        uniqueDates[datePart] = true;
        this.finalResult.push(datePart);
      }
    }
    console.log(this.finalResult, 'hello');
  }
  ///////////////////////////////////////////////////////////
  currentDate: Date = new Date();
  daysInMonth: Date[] = [];
  weekdayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  blankDays: Date[] = [];

  generateCalendar() {
    const currentDate = new Date();
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const startingDay = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday, etc.

    this.daysInMonth = [];
    this.blankDays = new Array(startingDay)
      .fill(null)
      .map((_, index) => new Date(year, month, 0 - index));

    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Calculate the number of days in the current month

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      date.setHours(currentDate.getHours());
      date.setMinutes(currentDate.getMinutes());
      date.setSeconds(currentDate.getSeconds());
      this.daysInMonth.push(date);
    }
  }

  isCurrentMonth(): boolean {
    const currentDateYear = new Date().getFullYear();
    const currentDateMonth = new Date().getMonth();
    const displayedYear = this.currentDate.getFullYear();
    const displayedMonth = this.currentDate.getMonth();
    return (
      currentDateYear === displayedYear && currentDateMonth === displayedMonth
    );
  }

  isAvailableDate(date: Date): boolean {
    const dateString = date.toISOString().slice(0, 10); // Convert date to "YYYY-MM-DD" format
    return (
      this.finalResult.includes(dateString) ||
      (this.selectedDate &&
        date.toDateString() === this.selectedDate.toDateString())
    );
  }

  selectDate(date: Date) {
    const dateString = date.toISOString().slice(0, 10); // Convert date to "YYYY-MM-DD" format
    if (this.finalResult.includes(dateString)) {
      this.selectedDate = date;
      this.dateFormat();
      // console.log(this.formattedDate);
      this.filterAppointmentsByDate();
    }
  }

  previousMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1,
      1
    );
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      1
    );
    this.generateCalendar();
  }

  ///////////////////////////////////////////////////////////

  filteredAppointments: any[] = [];
  appointmentsArray: any[] = [];
  slotSkeleton: boolean = false;
  dateRange: any[] = [];
  filterAppointmentsByDate() {
    this.slotSkeleton = true;
    this.viewAll = false;
    // this.finalResult = [];
    this.service
      .getSlots(this.selectedDr.Id, this.formattedDate)
      .subscribe(async (res: any) => {
        this.appointmentsArray = res.Result;
        // console.log(this.appointmentsArray);

        this.dateRange = this.appointmentsArray.map(
          (items) => items.Appointment
        );
        await this.getUniqueDates();
        if (this.selectedDate) {
          this.filteredAppointments = this.appointmentsArray
            .filter((appointment) => {
              const appointmentDate = new Date(appointment.Appointment);
              return (
                appointmentDate.getFullYear() ===
                  this.selectedDate.getFullYear() &&
                appointmentDate.getMonth() === this.selectedDate.getMonth() &&
                appointmentDate.getDate() === this.selectedDate.getDate()
              );
            })
            .map((appointment) => ({
              ShiftId: appointment.ShiftId,
              DoctorVendorId: appointment.DoctorVendorId,
              Shift: appointment.Shift,
              Appointment: new Date(appointment.Appointment),
              IsBooked: appointment.IsBooked,
            }));
          // console.log(this.filteredAppointments);
        } else {
          this.filteredAppointments = [];
        }
        this.slotSkeleton = false;
      });
  }

  viewAll: boolean = false;
  viewAllSlots() {
    this.viewAll = true;
  }

  display: boolean = false;
  bookSlot(data: any) {
    const inputDate = data.Appointment;
    const formattedDate = this.datePipe.transform(
      inputDate,
      'yyyy-MM-ddTHH:mm:ss'
    );
    const obj = {
      ShiftId: data.ShiftId,
      DoctorVendorId: data.DoctorVendorId,
      Shift: data.Shift,
      Appointment: formattedDate,
    };

    if (
      this.patientId === null ||
      this.patientId === undefined ||
      this.patientId === 0
    ) {
      this.service.setPatientModal$.next((this.display = true));
    } else {
      this.service.setHospitalDetails(this.hospitalDetailObject);
      this.service.setDrData(this.selectedDr);
      this.service.setAppointmentObj(obj);
      this.router.navigate(['/appointment/doctors/enter-details']);
    }
  }
}
