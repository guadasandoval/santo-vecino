import { Routes } from '@angular/router';
import { BookingDetailsComponent } from './components/booking-details/booking-details.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { BookingComponent } from './components/booking/booking.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', title: 'Home', component: HomeComponent, children: [] },
  { path: 'booking', title: 'Booking', component: BookingComponent },
  { path: 'booking/edit/:id', title: 'Edit', component: BookingComponent },
  { path: 'booking-details/:id', title: 'Booking-details', component: BookingDetailsComponent },
  { path: 'booking-list', title: 'Booking-list', component: BookingListComponent },
  
];
