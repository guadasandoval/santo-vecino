import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingModel } from '../models/booking-model';
import { ServerResponse } from '../models/server-response';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  readonly BASE_URL = 'http://localhost:3000';
  private http = inject(HttpClient);

  getAllBooking(): Observable<BookingModel[]> {
    return this.http.get<BookingModel[]>(`${this.BASE_URL}/booking`);
  }

  createBooking(booking: any): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(`${this.BASE_URL}/booking`, booking);
  }

  getBookingbyId(id: string): Observable<BookingModel> {
    return this.http.get<BookingModel>(
      `${this.BASE_URL}/booking-details/${id}`
    );
  }

  updateBooking(id: string, booking: any): Observable<ServerResponse> {
    return this.http.put<ServerResponse>(
      `${this.BASE_URL}/booking-details/${id}`,
      booking
    );
  }

  cancelBooking(id: string): Observable<ServerResponse> {
    return this.http.delete<ServerResponse>(
      `${this.BASE_URL}/booking-details/${id}`
    );
  }

  checkAvailability(checkIn: any, checkOut: any): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(
      `${this.BASE_URL}/booking-check`, {checkIn, checkOut}
    );
  }
}
