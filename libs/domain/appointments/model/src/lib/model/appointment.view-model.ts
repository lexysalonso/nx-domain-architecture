import { AppointmentStatus } from './appointment.model';

export interface AppointmentViewModel {
  id: string;
  clientName: string;
  clientPhone: string;
  serviceName: string;
  teamMemberName: string;
  locationName: string;
  locationId: string;
  timeRange: string;
  status: AppointmentStatus;
  statusLabel: string;
  statusClass: string;
}

const STATUS_LABELS: Record<AppointmentStatus, string> = {
  booked: 'Reservado',
  confirmed: 'Confirmado',
  checked_in: 'Registrado',
  in_progress: 'En curso',
  completed: 'Completado',
  cancelled: 'Cancelado',
  no_show: 'No asistió',
};

const STATUS_CLASSES: Record<AppointmentStatus, string> = {
  booked: 'bg-slate-100 text-slate-700 border-slate-300',
  confirmed: 'bg-blue-100 text-blue-700 border-blue-300',
  checked_in: 'bg-indigo-100 text-indigo-700 border-indigo-300',
  in_progress: 'bg-amber-100 text-amber-700 border-amber-300',
  completed: 'bg-green-100 text-green-700 border-green-300',
  cancelled: 'bg-red-100 text-red-700 border-red-300',
  no_show: 'bg-gray-200 text-gray-600 border-gray-400',
};

export const ALL_STATUSES: AppointmentStatus[] = [
  'booked',
  'confirmed',
  'checked_in',
  'in_progress',
  'completed',
  'cancelled',
  'no_show',
];

export interface StatusOption {
  value: AppointmentStatus;
  label: string;
}

export function statusLabel(status: AppointmentStatus): string {
  return STATUS_LABELS[status];
}

export function statusClass(status: AppointmentStatus): string {
  return STATUS_CLASSES[status];
}
