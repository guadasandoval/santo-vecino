import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingModel } from '../../models/booking-model';
import { BookingService } from '../../services/booking.service';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, NgIf, NgFor, ItemComponent],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css'
})
export class BookingListComponent {
  private bookingService = inject(BookingService)

  bookingList$: Observable<BookingModel[]> = this.bookingService.getAllBooking();
}
