import { Component, OnInit } from '@angular/core';
import { BookAppointmentServiceService } from '../book-appointment-service.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, transition, useAnimation } from '@angular/animations';
import { zoomIn, zoomOut } from 'ng-animate';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  providers: [DatePipe],
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
export class ScheduleComponent implements OnInit {
  items = [
    {
      title: 'Item 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      title: 'Item 2',
      description:
        'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      title: 'Item 3',
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      title: 'Item 4',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      title: 'Item 5',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      image: 'https://via.placeholder.com/300x200',
    },
  ];

  Number: any;
  drList: any;
  drFirstName: any;
  drLastName: any;
  drInitialName: any;
  spinner: boolean = false;
  drVendorId: number;
  userName: any;
  drId: number;
  doctorName: string;
  constructor(
    private service: BookAppointmentServiceService,
    private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.spinner = true;
    this.activatedRoute.params.subscribe((param) => {
      this.getAllDatesOfCurrentMonth();
    });

    this.userName = localStorage.getItem('userName');
    this.drVendorId = +localStorage.getItem('drVendorId')!;
    this.doctorName = localStorage.getItem('doctorName')!;
  }

  ngOnInit(): void {

    this.getCurrentDateSlots();
  }
  dateArr: any = [];
  getAllDatesOfCurrentMonth() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let day = currentDate.getDate(); day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const formattedDate = this.datePipe.transform(date, 'dd, MMMM');
      this.dateArr.push(formattedDate);
    }

    // console.log('Dates of Current Month:', this.dateArr[0]);
  }
  slotList: any = [];
  slotListFilterMorning: any = [];
  slotListFilterEvening: any = [];
  slotListFilterNight: any = [];

  getCurrentDateSlots() {
    var currentDate = this.dateArr[0];
    const currentYear = new Date().getFullYear();
    const date = new Date(currentDate);
    date.setFullYear(currentYear);
    const formattedDate = this.datePipe.transform(date, 'yyyy/MM/dd');

    this.service
      .getSlots(this.drVendorId, formattedDate)
      .subscribe((res: any) => {
        this.slotList = res?.Result;
        // this.doctorName = res?.Result[0]?.Doctor;
        // console.log(res);
        //
        this.spinner = false;
        //
        this.slotList.map((x: any) => {
          if (x.ShiftId === 1) {
            this.slotListFilterMorning.push({
              ShiftId: x.ShiftId,
              time: x.Appointment,
              shift: x.Shift,
              isBooked: x.IsBooked
            });
          } else if (x.ShiftId === 2) {
            this.slotListFilterEvening.push({
              ShiftId: x.ShiftId,
              time: x.Appointment,
              shift: x.Shift,
              isBooked: x.IsBooked
            });
          } else if (x.ShiftId === 3) {
            this.slotListFilterNight.push({
              ShiftId: x.ShiftId,
              time: x.Appointment,
              shift: x.Shift,
              isBooked: x.IsBooked
            });
          }
        });
      });
  }
  activeIndex: number = 0;
  loader: boolean = false;

  getDate(data: any) {
    this.slotListFilterMorning = [];
    this.slotListFilterEvening = [];
    this.slotListFilterNight = [];
    this.loader = true;
    var getdate = data?.originalEvent?.target?.innerText;
    // console.log(getdate);

    const currentYear = new Date().getFullYear();
    const date = new Date(getdate);
    date.setFullYear(currentYear);
    const formattedDate = this.datePipe.transform(date, 'yyyy/MM/dd');
    console.log(formattedDate);

    this.service
      .getSlots(this.drVendorId, formattedDate)
      .subscribe((res: any) => {
        this.slotList = res?.Result;
        //
        this.spinner = false;
        //
        this.loader = false;
        this.slotList.map((x: any) => {
          if (x.ShiftId === 1) {
            this.slotListFilterMorning.push({
              ShiftId: x.ShiftId,
              time: x.Appointment,
              shift: x.Shift,
              isBooked: x.IsBooked
            });
          } else if (x.ShiftId === 2) {
            this.slotListFilterEvening.push({
              ShiftId: x.ShiftId,
              time: x.Appointment,
              shift: x.Shift,
              isBooked: x.IsBooked
            });
          } else if (x.ShiftId === 3) {
            this.slotListFilterNight.push({
              ShiftId: x.ShiftId,
              time: x.Appointment,
              shift: x.Shift,
              isBooked: x.IsBooked
            });
          }
        });
      });
  }

  display: boolean = false;
  taost: boolean = false;
  showDialog(data: any) {
    console.log(data);
    if(data.isBooked === 0){
      if (this.userName === null || this.userName === undefined) {
        this.service.setPatientModal$.next((this.display = true));
      } else {
        localStorage.setItem('slotTime', data.time);
        this.router.navigate(['/appointment/doctors/enterDetails']);
      }
    }else{
      this.taost = true;
      setTimeout(() => {
        this.taost = false;
      }, 2000);
    }
   
  }
}
