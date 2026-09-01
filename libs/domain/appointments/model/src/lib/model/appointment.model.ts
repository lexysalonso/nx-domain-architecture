export type AppointmentStatus =
  | 'booked'
  | 'confirmed'
  | 'checked_in'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'no_show';

export type PaymentStatus = 'unpaid' | 'partially_paid' | 'paid' | 'refunded';

export interface AppointmentClient {
  id: string;
  fullName: string;
  phone: string;
}

export interface AppointmentServiceItem {
  id: string;
  name: string;
  durationMinutes: number;
  price: number;
}

export interface AppointmentTeamMember {
  id: string;
  fullName: string;
  role: string;
}

export interface AppointmentLocation {
  id: string;
  name: string;
}

export interface Appointment {
  id: string;
  client: AppointmentClient;
  service: AppointmentServiceItem;
  teamMember: AppointmentTeamMember;
  location: AppointmentLocation;
  startAt: string;
  endAt: string;
  status: AppointmentStatus;
  paymentStatus: PaymentStatus;
  notes?: string;
}
