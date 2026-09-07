import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
  OnInit,
} from '@angular/core';
import { AppointmentsFacade } from '@proj/domain/appointments/data-access';
import {
  toAppointmentViewModel,
  ALL_STATUSES,
  statusLabel,
} from '@proj/domain/appointments/model';
import { MOCK_LOCATIONS } from '@proj/domain/appointments/data-access';
import {
  AppointmentCardComponent,
  AppointmentFiltersComponent,
  EmptyStateComponent,
} from '@proj/domain/appointments/ui';
import { AppointmentStatus } from '@proj/domain/appointments/model';

@Component({
  selector: 'lib-appointments-list-container',
  standalone: true,
  imports: [
    AppointmentCardComponent,
    AppointmentFiltersComponent,
    EmptyStateComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="max-w-5xl mx-auto p-4 sm:p-6 space-y-4">
      <h1 class="text-xl font-semibold text-gray-900">Appointments</h1>

      <lib-appointment-filters
        [locations]="locationOptions"
        [statuses]="statusOptions"
        [selectedLocationId]="facade.filters().locationId"
        [selectedStatus]="facade.filters().status"
        (locationChange)="facade.setLocationFilter($event)"
        (statusChange)="facade.setStatusFilter($event)"
        (clear)="facade.clearFilters()"
      />

      @if (facade.successMessage(); as message) {
        <div
          class="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
          role="status"
          aria-live="polite"
        >
          <div class="flex items-center gap-2">
            <span
              class="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white"
              aria-hidden="true"
            >
              ✓
            </span>
            <span>{{ message }}</span>
          </div>
        </div>
      }

      @if (facade.error(); as error) {
        <section
          class="mb-6 rounded-xl border border-red-200 bg-red-50 p-6"
          role="alert"
        >
          <div
            class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 class="font-semibold text-red-900">Something went wrong</h2>
              <p class="mt-1 text-sm text-red-700">{{ error }}</p>
            </div>
            <button
              type="button"
              class="rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              (click)="onRetry()"
            >
              Retry
            </button>
          </div>
        </section>
      }

      @if (facade.loading()) {
        <p class="text-sm text-gray-500" role="status" aria-live="polite">
          Cargando appointments…
        </p>
      } @else if (!facade.hasAnyAppointments() && facade.hasLoadedOnce()) {
        <lib-empty-state message="No hay appointments registrados todavía." />
      } @else if (viewModels().length === 0 && facade.hasLoadedOnce()) {
        <lib-empty-state
          message="No hay appointments que coincidan con los filtros seleccionados."
        />
      } @else {
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          @for (vm of viewModels(); track vm.id) {
            <lib-appointment-card
              [appointment]="vm"
              [isUpdating]="facade.isUpdating(vm.id)"
              [statusOptions]="statusOptions"
              (statusChange)="onStatusChange(vm.id, $event)"
            />
          }
        </div>
      }
    </div>
  `,
})
export class AppointmentsListContainerComponent implements OnInit {
  protected readonly facade = inject(AppointmentsFacade);

  protected readonly locationOptions = MOCK_LOCATIONS;
  protected readonly statusOptions = ALL_STATUSES.map((status) => ({
    value: status,
    label: statusLabel(status),
  }));

  protected readonly viewModels = computed(() =>
    this.facade.appointments().map(toAppointmentViewModel),
  );

  ngOnInit(): void {
    this.facade.loadAppointments();
  }

  onRetry(): void {
    this.facade.loadAppointments();
  }

  onStatusChange(id: string, status: AppointmentStatus): void {
    this.facade.updateStatus(id, status);
  }
}