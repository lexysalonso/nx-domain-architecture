import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

import {
  Appointment,
  AppointmentStatus,
} from '@proj/domain/appointments/model';

@Component({
  selector: 'app-appointment-card',
  standalone: true,
  templateUrl: './appointment-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentCardComponent {
  readonly appointment = input.required<Appointment>();

  readonly updating = input(false);

  readonly statusChange = output<AppointmentStatus>();

  onStatusSelected(event: Event): void {
    const select = event.target as HTMLSelectElement;

    this.statusChange.emit(select.value as AppointmentStatus);
  }

  formatTime(date: string): string {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(date));
  }

  formatStatus(status: AppointmentStatus): string {
    return status
      .replace('_', ' ')
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  statusClasses(): string {
    switch (this.appointment().status) {
      case 'booked':
        return 'bg-slate-100 text-slate-700';

      case 'confirmed':
        return 'bg-emerald-100 text-emerald-700';

      case 'checked_in':
        return 'bg-blue-100 text-blue-700';

      case 'in_progress':
        return 'bg-violet-100 text-violet-700';

      case 'completed':
        return 'bg-green-100 text-green-700';

      case 'cancelled':
        return 'bg-red-100 text-red-700';

      case 'no_show':
        return 'bg-orange-100 text-orange-700';
    }
  }
}
