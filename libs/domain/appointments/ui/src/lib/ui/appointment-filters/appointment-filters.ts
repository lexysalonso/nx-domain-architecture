import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import {
  AppointmentLocation,
  AppointmentStatus,
} from '@proj/domain/appointments/model';

export interface StatusOption {
  value: AppointmentStatus;
  label: string;
}

@Component({
  selector: 'lib-appointment-filters',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col sm:flex-row gap-3 sm:items-end">
      <div class="flex-1">
        <label
          for="location-filter"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Location
        </label>
        <select
          id="location-filter"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          [value]="selectedLocationId() ?? ''"
          (change)="onLocationChange($event)"
        >
          <option value="">Todas las locations</option>
          @for (loc of locations(); track loc.id) {
            <option [value]="loc.id">{{ loc.name }}</option>
          }
        </select>
      </div>

      <div class="flex-1">
        <label
          for="status-filter"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Estado
        </label>
        <select
          id="status-filter"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          [value]="selectedStatus() ?? ''"
          (change)="onStatusChange($event)"
        >
          <option value="">Todos los estados</option>
          @for (opt of statuses(); track opt.value) {
            <option [value]="opt.value">{{ opt.label }}</option>
          }
        </select>
      </div>

      @if (selectedLocationId() || selectedStatus()) {
        <button
          type="button"
          (click)="clear.emit()"
          class="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded whitespace-nowrap"
        >
          Limpiar filtros
        </button>
      }
    </div>
  `,
})
export class AppointmentFiltersComponent {
  locations = input.required<AppointmentLocation[]>();
  statuses = input.required<StatusOption[]>();
  selectedLocationId = input<string | null>(null);
  selectedStatus = input<AppointmentStatus | null>(null);

  locationChange = output<string | null>();
  statusChange = output<AppointmentStatus | null>();
  clear = output<void>();

  onLocationChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.locationChange.emit(value || null);
  }

  onStatusChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as
      AppointmentStatus | '';
    this.statusChange.emit(value || null);
  }
}
