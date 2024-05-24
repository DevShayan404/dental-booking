import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Home/home/home.component';
import { AboutComponent } from './About/about/about.component';
import { ContactComponent } from './Contact/contact/contact.component';
import { PrivacyComponent } from './Privacy/privacy/privacy.component';
import { HistoryComponent } from './History/history/history.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'appointment',
    loadChildren: () =>
      import('./BookAppointment/book-appointment.module').then(
        (m) => m.BookAppointmentModule
      ),
  },

  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacyComponent,
  },
  {
    path: 'slot-history',
    component: HistoryComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
