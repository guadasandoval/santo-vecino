import { DatePipe, NgIf } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookingModel } from '../../models/booking-model';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [NgIf, DatePipe, RouterLink],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  itemInput = input.required<BookingModel>();
}
