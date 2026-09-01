import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  Appointment,
  AppointmentLocation,
  AppointmentStatus,
} from '@proj/domain/appointments/model';

import { MockAppointmentsService } from '../../../../data-access/src';
import { AppointmentCardComponent } from '../../../../ui/src/lib/ui/appointment-card/appointment-card';
import { AppointmentFiltersComponent } from '../../../../ui/src/lib/ui/appointment-filters/appointment-filters';

@Component({
  selector: 'app-appointments-list-container',
  standalone: true,
  imports: [AppointmentCardComponent, AppointmentFiltersComponent],
  templateUrl: './appointments-list-container.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentsListContainer implements OnInit {
  private readonly appointmentsService = inject(MockAppointmentsService);
  private readonly destroyRef = inject(DestroyRef);

  // -------------------------
  // State
  // -------------------------

  readonly appointments = signal<Appointment[]>([]);

  readonly loading = signal(false);

  readonly error = signal<string | null>(null);

  readonly selectedLocation = signal<string | null>(null);

  readonly selectedStatus = signal<AppointmentStatus | null>(null);

  /**
   * ID del appointment que actualmente
   * está siendo actualizado.
   */
  readonly updatingAppointmentId = signal<string | null>(null);

  /**
   * Mensaje temporal de éxito.
   */
  readonly successMessage = signal<string | null>(null);

  // -------------------------
  // Derived state
  // -------------------------

  readonly locations = computed<AppointmentLocation[]>(() => {
    const locations = this.appointments().map(
      (appointment) => appointment.location,
    );

    const uniqueLocations = new Map(
      locations.map((location) => [location.id, location]),
    );

    return [...uniqueLocations.values()];
  });

  readonly filteredAppointments = computed(() => {
    const locationId = this.selectedLocation();
    const status = this.selectedStatus();

    return this.appointments().filter((appointment) => {
      const matchesLocation =
        !locationId || appointment.location.id === locationId;

      const matchesStatus = !status || appointment.status === status;

      return matchesLocation && matchesStatus;
    });
  });

  readonly hasActiveFilters = computed(
    () => this.selectedLocation() !== null || this.selectedStatus() !== null,
  );

  // -------------------------
  // Lifecycle
  // -------------------------

  ngOnInit(): void {
    this.loadAppointments();
  }

  // -------------------------
  // Data
  // -------------------------

  loadAppointments(): void {
    this.loading.set(true);
    this.error.set(null);

    this.appointmentsService
      .getAppointments()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (appointments) => {
          this.appointments.set(appointments);
          this.loading.set(false);
        },

        error: () => {
          this.error.set(
            'We could not load the appointments. Please try again.',
          );

          this.loading.set(false);
        },
      });
  }

  // -------------------------
  // Filters
  // -------------------------

  onLocationChange(locationId: string | null): void {
    this.selectedLocation.set(locationId);
  }

  onStatusChange(status: AppointmentStatus | null): void {
    this.selectedStatus.set(status);
  }

  clearFilters(): void {
    this.selectedLocation.set(null);
    this.selectedStatus.set(null);
  }

  // -------------------------
  // Update status
  // -------------------------

  updateStatus(appointmentId: string, status: AppointmentStatus): void {
    /**
     * Evita iniciar otra actualización mientras
     * existe una actualización en progreso.
     */
    if (this.updatingAppointmentId() !== null) {
      return;
    }

    this.updatingAppointmentId.set(appointmentId);
    this.error.set(null);
    this.successMessage.set(null);

    this.appointmentsService
      .updateAppointmentStatus(appointmentId, status)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (updatedAppointment) => {
          this.appointments.update((appointments) =>
            appointments.map((appointment) =>
              appointment.id === updatedAppointment.id
                ? updatedAppointment
                : appointment,
            ),
          );

          this.updatingAppointmentId.set(null);

          this.successMessage.set('Appointment status updated successfully.');

          this.clearSuccessMessage();
        },

        error: () => {
          this.updatingAppointmentId.set(null);

          this.error.set(
            'We could not update the appointment status. Please try again.',
          );
        },
      });
  }

  private clearSuccessMessage(): void {
    setTimeout(() => {
      this.successMessage.set(null);
    }, 3000);
  }
}
