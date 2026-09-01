import { Injectable } from '@angular/core';
import { Observable, mergeMap, of, throwError, timer } from 'rxjs';
import {
  Appointment,
  AppointmentLocation,
  AppointmentStatus,
} from '@proj/domain/appointments/model';

export const MOCK_LOCATIONS: AppointmentLocation[] = [
  { id: 'loc-miramar', name: 'Miramar Studio' },
  { id: 'loc-pembroke', name: 'Pembroke Pines Studio' },
  { id: 'loc-weston', name: 'Weston Beauty Bar' },
];

function appointmentTime(
  daysFromToday: number,
  hour: number,
  minute: number,
  durationMinutes: number,
): Pick<Appointment, 'startAt' | 'endAt'> {
  const start = new Date();
  start.setHours(hour, minute, 0, 0);
  start.setDate(start.getDate() + daysFromToday);

  const end = new Date(start.getTime() + durationMinutes * 60_000);

  return {
    startAt: start.toISOString(),
    endAt: end.toISOString(),
  };
}

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1001',
    client: {
      id: 'cli-101',
      fullName: 'Sofia Martinez',
      phone: '(954) 555-0101',
    },
    service: {
      id: 'srv-01',
      name: 'Silk Press',
      durationMinutes: 90,
      price: 95,
    },
    teamMember: {
      id: 'tm-01',
      fullName: 'Camila Rodriguez',
      role: 'Hair Stylist',
    },
    location: MOCK_LOCATIONS[0],
    ...appointmentTime(0, 9, 0, 90),
    status: 'confirmed',
    paymentStatus: 'partially_paid',
    notes: 'Client prefers fragrance-free products.',
  },
  {
    id: 'apt-1002',
    client: {
      id: 'cli-102',
      fullName: 'Isabella Johnson',
      phone: '(305) 555-0102',
    },
    service: {
      id: 'srv-02',
      name: 'Gel Manicure',
      durationMinutes: 60,
      price: 55,
    },
    teamMember: {
      id: 'tm-02',
      fullName: 'Valentina Perez',
      role: 'Nail Artist',
    },
    location: MOCK_LOCATIONS[1],
    ...appointmentTime(0, 10, 30, 60),
    status: 'checked_in',
    paymentStatus: 'unpaid',
  },
  {
    id: 'apt-1003',
    client: {
      id: 'cli-103',
      fullName: 'Mia Williams',
      phone: '(786) 555-0103',
    },
    service: {
      id: 'srv-03',
      name: 'Classic Lash Fill',
      durationMinutes: 75,
      price: 80,
    },
    teamMember: { id: 'tm-03', fullName: 'Emma Davis', role: 'Lash Artist' },
    location: MOCK_LOCATIONS[2],
    ...appointmentTime(0, 11, 15, 75),
    status: 'in_progress',
    paymentStatus: 'paid',
  },
  {
    id: 'apt-1004',
    client: {
      id: 'cli-104',
      fullName: 'Olivia Brown',
      phone: '(954) 555-0104',
    },
    service: {
      id: 'srv-04',
      name: 'Brow Shape & Tint',
      durationMinutes: 45,
      price: 48,
    },
    teamMember: {
      id: 'tm-04',
      fullName: 'Daniela Lopez',
      role: 'Brow Specialist',
    },
    location: MOCK_LOCATIONS[0],
    ...appointmentTime(0, 13, 0, 45),
    status: 'booked',
    paymentStatus: 'unpaid',
  },
  {
    id: 'apt-1005',
    client: { id: 'cli-105', fullName: 'Ava Garcia', phone: '(305) 555-0105' },
    service: {
      id: 'srv-05',
      name: 'Balayage',
      durationMinutes: 180,
      price: 240,
    },
    teamMember: {
      id: 'tm-01',
      fullName: 'Camila Rodriguez',
      role: 'Hair Stylist',
    },
    location: MOCK_LOCATIONS[1],
    ...appointmentTime(0, 14, 0, 180),
    status: 'confirmed',
    paymentStatus: 'partially_paid',
  },
  {
    id: 'apt-1006',
    client: { id: 'cli-106', fullName: 'Emma Wilson', phone: '(786) 555-0106' },
    service: {
      id: 'srv-06',
      name: 'Hydrating Facial',
      durationMinutes: 60,
      price: 120,
    },
    teamMember: {
      id: 'tm-05',
      fullName: 'Natalia Hernandez',
      role: 'Esthetician',
    },
    location: MOCK_LOCATIONS[2],
    ...appointmentTime(1, 9, 30, 60),
    status: 'booked',
    paymentStatus: 'unpaid',
  },
  {
    id: 'apt-1007',
    client: {
      id: 'cli-107',
      fullName: 'Charlotte Anderson',
      phone: '(954) 555-0107',
    },
    service: {
      id: 'srv-07',
      name: 'Acrylic Full Set',
      durationMinutes: 105,
      price: 90,
    },
    teamMember: {
      id: 'tm-02',
      fullName: 'Valentina Perez',
      role: 'Nail Artist',
    },
    location: MOCK_LOCATIONS[0],
    ...appointmentTime(1, 11, 0, 105),
    status: 'confirmed',
    paymentStatus: 'paid',
  },
  {
    id: 'apt-1008',
    client: {
      id: 'cli-108',
      fullName: 'Amelia Thompson',
      phone: '(305) 555-0108',
    },
    service: {
      id: 'srv-08',
      name: 'Volume Lash Set',
      durationMinutes: 150,
      price: 175,
    },
    teamMember: { id: 'tm-03', fullName: 'Emma Davis', role: 'Lash Artist' },
    location: MOCK_LOCATIONS[1],
    ...appointmentTime(1, 13, 30, 150),
    status: 'cancelled',
    paymentStatus: 'refunded',
    notes: 'Cancelled by client.',
  },
];

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
