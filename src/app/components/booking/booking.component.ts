import { formatDate, JsonPipe, NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  dateValidation,
  untilThirtyBefore,
} from '../../common/date-validation';
import { ServerResponse } from '../../models/server-response';
import { BookingService } from '../../services/booking.service';

//lo utilizo para crear y editar el formulario
@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgIf, NgClass],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
})
export class BookingComponent implements OnInit {
  isEditMode: boolean = false;
  bookingId: string | null = null;
  messageCheck: string = '';

  formBuilder = inject(FormBuilder);
  private bookingService = inject(BookingService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.bookingId = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.bookingId) {
      this.isEditMode = true;
      this.loadBookingData(); // modo editar
    } else {
      this.isEditMode = false; //modo crear
    }
    this.bookingForm.get('checkIn')?.valueChanges.subscribe(() => {
      this.checkAvailabilityBooking();
    });
  
    this.bookingForm.get('checkOut')?.valueChanges.subscribe(() => {
      this.checkAvailabilityBooking();
    });
  }

  bookingForm = this.formBuilder.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      checkIn: [
        null as Date | null,
        [Validators.required, untilThirtyBefore(30)],
      ],
      checkOut: [null as Date | null, Validators.required],
    },
    {
      // es una validacion cruzada que evalua checkin y checkout. Max 3 dias
      validators: dateValidation(3),
    }
  );

  onSubmit() {
    if (this.bookingForm.invalid) {
      return;
    }
    if (this.isEditMode) {
      this.bookingService
        .updateBooking(this.bookingId!, this.bookingForm.value)
        .subscribe((res: ServerResponse) => {
          if (res.status == 'success') {
            console.log('Se actualizo la reserva id:', res.bookingId);
            this.bookingForm.reset();
            this.router.navigate(['/']);
          } else {
            console.log('Error al actualizar reserva ');
          }
        });
    } else {
      this.bookingService
        .createBooking(this.bookingForm.value)
        .subscribe((res: ServerResponse) => {
          if (res.status == 'success') {
            console.log('Se creo una nueva reserva');
            this.bookingForm.reset();
            console.log(res.bookingId);

            this.router.navigate(['/booking-details', res.bookingId]);
          } else {
            console.log('Error al crear booking ');
          }
        });
    }
  }

  loadBookingData() {
    this.bookingService
      .getBookingbyId(this.bookingId!)
      .subscribe((bookingData) => {
        this.bookingForm.patchValue({
          firstName: bookingData.firstName || '',
          lastName: bookingData.lastName || '',
          email: bookingData.email || '',
          checkIn: bookingData.checkIn ? new Date(bookingData.checkIn) : null,
          checkOut: bookingData.checkOut
            ? new Date(bookingData.checkOut)
            : null,
        });
      });
  }

  //Todas las reservas comienzan al menos el día siguiente de la reserva,
  addDayCheckInChange() {
    const checkInSelected = this.bookingForm.get('checkIn')?.value;
    if (checkInSelected) {
      const formatDateCheckIn = new Date(checkInSelected + 'T00:00:00'); // del html viene como string

      formatDateCheckIn.setDate(formatDateCheckIn.getDate() + 1);
      this.bookingForm.get('checkIn')?.setValue(formatDateCheckIn);
    }
  }

  checkAvailabilityBooking() {
    let checkIn = this.bookingForm.get('checkIn')?.value;
    const checkOut = this.bookingForm.get('checkOut')?.value;
     if(checkIn && checkOut){
      this.bookingService
      .checkAvailability(checkIn, checkOut)
      .subscribe((res: ServerResponse) => {
        if (res.status == 'availability') {
          this.messageCheck = res.message;
        } else{
          this.messageCheck = res.message;
        }
      });
  }
    
  }
}
