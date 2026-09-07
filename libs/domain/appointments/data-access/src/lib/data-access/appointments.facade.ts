import {
  DestroyRef,
  Injectable,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  Appointment,
  AppointmentStatus,
} from '@proj/domain/appointments/model';
import { MockAppointmentsService } from './mock-appointments.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface AppointmentFilters {
  locationId: string | null;
  status: AppointmentStatus | null;
}

@Injectable({ providedIn: 'root' })
export class AppointmentsFacade {
  private readonly service = inject(MockAppointmentsService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly _appointments = signal<Appointment[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);
  private readonly _hasLoadedOnce = signal<boolean>(false);
  private readonly _updatingIds = signal<Set<string>>(new Set());
  private readonly _filters = signal<AppointmentFilters>({
    locationId: null,
    status: null,
  });

  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly hasLoadedOnce = this._hasLoadedOnce.asReadonly();
  readonly filters = this._filters.asReadonly();

  private readonly _successMessage = signal<string | null>(null);
  readonly successMessage = this._successMessage.asReadonly();

  readonly appointments = computed(() => {
    const { locationId, status } = this._filters();
    return this._appointments().filter((a) => {
      const matchesLocation = !locationId || a.location.id === locationId;
      const matchesStatus = !status || a.status === status;
      return matchesLocation && matchesStatus;
    });
  });

  readonly hasAnyAppointments = computed(() => this._appointments().length > 0);

  loadAppointments(): void {
    this._loading.set(true);
    this._error.set(null);

    this.service
      .getAppointments()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (appointments) => {
          this._appointments.set(appointments);
          this._loading.set(false);
          this._hasLoadedOnce.set(true);
        },
        error: () => {
          this._error.set(
            'No se pudieron cargar los appointments. Intentá de nuevo.',
          );
          this._loading.set(false);
          this._hasLoadedOnce.set(true);
        },
      });
  }

  isUpdating(id: string): boolean {
    return this._updatingIds().has(id);
  }

  updateStatus(id: string, status: AppointmentStatus): void {
    if (this.isUpdating(id)) {
      return; // evita disparar un segundo update mientras el primero está en curso
    }

    this._addUpdatingId(id);

    this.service
      .updateAppointmentStatus(id, status)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (updated) => {
          this._appointments.update((list) =>
            list.map((a) => (a.id === id ? updated : a)),
          );
          this._removeUpdatingId(id);
          this._successMessage.set('Estado actualizado correctamente.');
          this._clearSuccessMessageAfterDelay();
        },
        error: () => {
          this._error.set('No se pudo actualizar el estado del appointment.');
          this._removeUpdatingId(id);
        },
      });
  }

  setLocationFilter(locationId: string | null): void {
    this._filters.update((f) => ({ ...f, locationId }));
  }

  setStatusFilter(status: AppointmentStatus | null): void {
    this._filters.update((f) => ({ ...f, status }));
  }

  clearFilters(): void {
    this._filters.set({ locationId: null, status: null });
  }
  private _clearSuccessMessageAfterDelay(): void {
    setTimeout(() => this._successMessage.set(null), 3000);
  }
  private _addUpdatingId(id: string): void {
    this._updatingIds.update((set) => {
      const next = new Set(set);
      next.add(id);
      return next;
    });
  }

  private _removeUpdatingId(id: string): void {
    this._updatingIds.update((set) => {
      const next = new Set(set);
      next.delete(id);
      return next;
    });
  }
}
