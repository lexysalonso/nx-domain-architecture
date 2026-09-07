import { Appointment } from './appointment.model';
import {
  AppointmentViewModel,
  statusClass,
  statusLabel,
} from './appointment.view-model';

function formatTime(isoDate: string): string {
  return new Date(isoDate).toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function toAppointmentViewModel(
  appointment: Appointment,
): AppointmentViewModel {
  return {
    id: appointment.id,
    clientName: appointment.client.fullName,
    clientPhone: appointment.client.phone,
    serviceName: appointment.service.name,
    teamMemberName: appointment.teamMember.fullName,
    locationName: appointment.location.name,
    locationId: appointment.location.id,
    timeRange: `${formatTime(appointment.startAt)} – ${formatTime(appointment.endAt)}`,
    status: appointment.status,
    statusLabel: statusLabel(appointment.status),
    statusClass: statusClass(appointment.status),
  };
}
