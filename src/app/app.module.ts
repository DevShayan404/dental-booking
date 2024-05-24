import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AngularTypewriterEffectModule } from 'angular-typewriter-effect';
import { CarouselModule } from 'primeng/carousel';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Navbr/navbar/navbar.component';
import { HomeComponent } from './Home/home/home.component';
import { FooterComponent } from './Footer/footer/footer.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ScrollTopModule } from 'primeng/scrolltop';
import { PanelModule } from 'primeng/panel';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabMenuModule } from 'primeng/tabmenu';
import { AuthGuard } from './auth.guard';
import { SidebarModule } from 'primeng/sidebar';
import { RatingModule } from 'primeng/rating';
import { RouterModule } from '@angular/router';
import { BookAppointmentModule } from './BookAppointment/book-appointment.module';
import { StepsModule } from 'primeng/steps';
import { CalendarModule } from 'primeng/calendar';
import { SkeletonModule } from 'primeng/skeleton';
import { AboutComponent } from './About/about/about.component';
import { ContactComponent } from './Contact/contact/contact.component';
import { PrivacyComponent } from './Privacy/privacy/privacy.component';
import { HistoryComponent } from './History/history/history.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { LaoderComponent } from './Loader/laoder/laoder.component';
import { HomeSkeletonComponent } from './Home/home-skeleton/home-skeleton.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { ScrollDivComponent } from './scroll-div/scroll-div.component';
import { AvatarModule } from 'primeng/avatar';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    PrivacyComponent,
    HistoryComponent,
    LaoderComponent,
    HomeSkeletonComponent,
    ScrollDivComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularTypewriterEffectModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    CardModule,
    TabViewModule,
    DialogModule,
    InputNumberModule,
    ScrollTopModule,
    PanelModule,
    NgSelectModule,
    ProgressSpinnerModule,
    TabMenuModule,
    SidebarModule,
    RatingModule,
    RouterModule,
    BookAppointmentModule,
    StepsModule,
    CalendarModule,
    SkeletonModule,
    InputSwitchModule,
    GoogleMapsModule,
    AvatarModule,
    ToastModule,
    ConfirmDialogModule,
    InputTextareaModule,
    DividerModule,
    TooltipModule,
  ],
  providers: [AuthGuard,],
  bootstrap: [AppComponent],
})
export class AppModule {}
