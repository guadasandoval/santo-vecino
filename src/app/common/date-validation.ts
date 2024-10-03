import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export function dateValidation(maxDays: number): ValidatorFn {
  return (formGroup: AbstractControl): { [key: string]: any } | null => {
    const checkIn = formGroup.get('checkIn')?.value;
    const checkOut = formGroup.get('checkOut')?.value;

    if (!checkIn || !checkOut) {
      return null;
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    const diffTime = checkOutDate.getTime() - checkInDate.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);

    return diffDays > maxDays ? { dateRangeInvalid: true } : null;
  };
}

export function untilThirtyBefore(maxDays: number): ValidatorFn {
  return (formGroup: AbstractControl): { [key: string]: any } | null => {
    const checkIn = formGroup.value;
    if (!checkIn) {
      return null;
    }

    const checkInDate = new Date(checkIn); // lo convierto a tipo Date
    const today = new Date();

    const diffTime = checkInDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24)); // lo paso a dias

    return diffDays > maxDays ? { tooEarly: true } : null;
  };
}


