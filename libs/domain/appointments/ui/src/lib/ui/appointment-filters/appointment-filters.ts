import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

import {
  AppointmentLocation,
  AppointmentStatus,
} from '@proj/domain/appointments/model';

@Component({
  selector: 'app-appointment-filters',
  standalone: true,
  templateUrl: './appointment-filters.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentFiltersComponent {
  readonly locations = input.required<AppointmentLocation[]>();

  readonly selectedLocation = input<string | null>(null);

  readonly selectedStatus = input<AppointmentStatus | null>(null);

  readonly hasActiveFilters = input(false);

  readonly locationChange = output<string | null>();

  readonly statusChange = output<AppointmentStatus | null>();

  readonly clear = output<void>();

  onLocationChange(event: Event): void {
    const select = event.target as HTMLSelectElement;

    this.locationChange.emit(select.value || null);
  }

  onStatusChange(event: Event): void {
    const select = event.target as HTMLSelectElement;

    this.statusChange.emit((select.value || null) as AppointmentStatus | null);
  }
}
