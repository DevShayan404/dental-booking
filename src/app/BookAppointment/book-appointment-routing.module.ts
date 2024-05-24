import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookAppointmentComponent } from './book-appointment.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { DrListComponent } from './dr-list/dr-list.component';
import { EnterDetailsComponent } from './enter-details/enter-details.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { AppointmentComponent } from './appointment/appointment.component';


const routes: Routes = [
  {
    path: 'appointment',
    component: BookAppointmentComponent,
    children: [
      {
        path: 'doctors',
        component: DrListComponent,
        data: {
          showLoactionInput: true,
          hideFooter: true,
        },
      },
      {
        path: 'doctors/schedule/:id',
        component: ScheduleComponent,
        data: {
          hide: true,
          hideFooter: true,
        },
      },
      {
        path: 'doctors/enter-details',
        component: EnterDetailsComponent,
        data: {
          // hideNav: true,
          // hideFooter: true,
        },
      },
      {
        path: 'hospital/profile/:id',
        component: ViewProfileComponent,
        data: {
          notFixedNav: true,
          
        },
      },
      {
        path: 'doctors/booked',
        component: AppointmentComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookAppointmentRoutingModule {}
