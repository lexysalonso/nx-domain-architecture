import { Injectable } from '@angular/core';
import { Observable, mergeMap, of, throwError, timer } from 'rxjs';
import {
  Appointment,
  AppointmentStatus,
} from '@proj/domain/appointments/model';
import { MOCK_APPOINTMENTS } from './appointments-mock-data';

@Injectable({ providedIn: 'root' })
export class MockAppointmentsService {
  private appointments: Appointment[] = structuredClone(MOCK_APPOINTMENTS);
  private shouldFailNextRequest = false;

  failNextRequest(): void {
    this.shouldFailNextRequest = true;
  }

  getAppointments(): Observable<Appointment[]> {
    return this.respond(() => structuredClone(this.appointments));
  }

  reset(): void {
    this.appointments = structuredClone(MOCK_APPOINTMENTS);
    this.shouldFailNextRequest = false;
  }

  updateAppointmentStatus(
    appointmentId: string,
    status: AppointmentStatus,
  ): Observable<Appointment> {
    return this.respond(() => {
      const index = this.appointments.findIndex((a) => a.id === appointmentId);

      if (index === -1) {
        throw new Error(`Appointment with id "${appointmentId}" not found.`);
      }

      const updated: Appointment = {
        ...this.appointments[index],
        status,
      };

      // Reemplazo inmutable: nunca muto this.appointments[index] directamente
      this.appointments = [
        ...this.appointments.slice(0, index),
        updated,
        ...this.appointments.slice(index + 1),
      ];

      // Devuelvo una copia, no la referencia interna
      return structuredClone(updated);
    });
  }

  private respond<T>(factory: () => T, latencyMs = 700): Observable<T> {
    return timer(latencyMs).pipe(
      mergeMap(() => {
        if (this.shouldFailNextRequest) {
          this.shouldFailNextRequest = false;
          return throwError(
            () => new Error('The simulated appointments API failed.'),
          );
        }

        try {
          return of(factory());
        } catch (error: unknown) {
          return throwError(() => error);
        }
      }),
    );
  }
}
