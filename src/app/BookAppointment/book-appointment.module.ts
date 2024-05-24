import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { BookAppointmentRoutingModule } from './book-appointment-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScheduleComponent } from './schedule/schedule.component';
import { BookAppointmentComponent } from './book-appointment.component';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DrListComponent } from './dr-list/dr-list.component';
import { DrListPipe } from './dr-list.pipe';
import { EnterDetailsComponent } from './enter-details/enter-details.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { SkeletonDrListComponent } from './Skeleton/skeleton-dr-list/skeleton-dr-list.component';
import { SkeletonModule } from 'primeng/skeleton';
import { SkeletonScheduleComponent } from './Skeleton/skeleton-schedule/skeleton-schedule.component';
import { SkeletonSlotsComponent } from './Skeleton/skeleton-slots/skeleton-slots.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { RatingModule } from 'primeng/rating';
import { AvatarModule } from 'primeng/avatar';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';
import { SkeletonViewProfileComponent } from './Skeleton/skeleton-view-profile/skeleton-view-profile.component';
import { DaysPipe } from './PipeModule/convertDays/days.pipe';
import { ToastModule } from 'primeng/toast';
import { SkeletonEnterDetailComponent } from './Skeleton/skeleton-enter-detail/skeleton-enter-detail/skeleton-enter-detail.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';


@NgModule({
  declarations: [
    ScheduleComponent,
    BookAppointmentComponent,
    DrListComponent,
    DrListPipe,
    EnterDetailsComponent,
    ViewProfileComponent,
    SkeletonDrListComponent,
    SkeletonScheduleComponent,
    SkeletonSlotsComponent,
    SkeletonViewProfileComponent,
    DaysPipe,
    SkeletonEnterDetailComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BookAppointmentRoutingModule,
    PanelModule,
    CardModule,
    TabViewModule,
    DialogModule,
    InputNumberModule,
    RouterModule,
    BreadcrumbModule,
    SkeletonModule,
    GoogleMapsModule,
    RatingModule,
    AvatarModule,
    NgSelectModule,
    CalendarModule,
    ToastModule,
    ScrollToModule.forRoot()
  ],
  providers:[DatePipe]
})
export class BookAppointmentModule {}

