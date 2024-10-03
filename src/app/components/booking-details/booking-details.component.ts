import { AsyncPipe, DatePipe, NgClass, NgIf, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { BookingModel } from '../../models/booking-model';
import { BookingService } from '../../services/booking.service';
import { ServerResponse } from '../../models/server-response';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [AsyncPipe, NgIf, DatePipe, RouterLink, NgClass, NgOptimizedImage],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css',
})
export class BookingDetailsComponent implements OnInit {
  bookingId: string = '' ;
  bookingDetails: Observable<BookingModel> | undefined;
  private bookingService = inject(BookingService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.bookingId = this.activatedRoute.snapshot.paramMap.get('id')!; 
    if(this.bookingId){
      this.bookingDetails = this.bookingService.getBookingbyId(this.bookingId);
    }
  }

  cancelBooking(){
    this.bookingService.cancelBooking(this.bookingId).subscribe((res:ServerResponse)=>{
      console.log('Response:', res);
      if(res.status == 'success'){
        console.log('Delete booking successfully');
        this.router.navigate(['/'])
      }
    })
  }
  
}
