import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import {
  AppointmentViewModel,
  AppointmentStatus,
  StatusOption,
} from '@proj/domain/appointments/model';

@Component({
  selector: 'lib-appointment-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article
      class="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
    >
      <!-- Header -->
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="text-sm font-medium text-indigo-600">
            {{ appointment().timeRange }}
          </p>
          <h2 class="mt-1 text-lg font-semibold text-slate-900">
            {{ appointment().clientName }}
          </h2>
        </div>

        <span
          class="shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold border"
          [class]="appointment().statusClass"
        >
          {{ appointment().statusLabel }}
        </span>
      </div>

      <!-- Appointment information -->
      <div class="mt-5 space-y-4">
        <!-- Service -->
        <div class="flex items-start gap-3">
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100"
            aria-hidden="true"
          >
            ✂
          </div>
          <div class="min-w-0">
            <p
              class="text-xs font-medium uppercase tracking-wide text-slate-400"
            >
              Service
            </p>
            <p class="mt-0.5 truncate text-sm font-medium text-slate-800">
              {{ appointment().serviceName }}
            </p>
          </div>
        </div>

        <!-- Team member -->
        <div class="flex items-start gap-3">
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100"
            aria-hidden="true"
          >
            👤
          </div>
          <div class="min-w-0">
            <p
              class="text-xs font-medium uppercase tracking-wide text-slate-400"
            >
              Team member
            </p>
            <p class="mt-0.5 truncate text-sm font-medium text-slate-800">
              {{ appointment().teamMemberName }}
            </p>
          </div>
        </div>

        <!-- Location -->
        <div class="flex items-start gap-3">
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100"
            aria-hidden="true"
          >
            📍
          </div>
          <div class="min-w-0">
            <p
              class="text-xs font-medium uppercase tracking-wide text-slate-400"
            >
              Location
            </p>
            <p class="mt-0.5 truncate text-sm font-medium text-slate-800">
              {{ appointment().locationName }}
            </p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-5 border-t border-slate-100 pt-4">
        <label
          [for]="'status-' + appointment().id"
          class="mb-2 block text-xs font-medium text-slate-500"
        >
          Update status
        </label>

        <select
          [id]="'status-' + appointment().id"
          [value]="appointment().status"
          [disabled]="isUpdating()"
          class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-70"
          [attr.aria-busy]="isUpdating()"
          [attr.aria-label]="'Status for ' + appointment().clientName"
          (change)="onStatusChange($event)"
        >
          @for (opt of statusOptions(); track opt.value) {
            <option [value]="opt.value">{{ opt.label }}</option>
          }
        </select>

        @if (isUpdating()) {
          <p
            class="mt-2 flex items-center gap-2 text-xs font-medium text-indigo-600"
            role="status"
            aria-live="polite"
          >
            <span
              class="h-3 w-3 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600"
              aria-hidden="true"
            ></span>
            Updating appointment...
          </p>
        }
      </div>
    </article>
  `,
})
export class AppointmentCardComponent {
  appointment = input.required<AppointmentViewModel>();
  isUpdating = input<boolean>(false);
  statusOptions = input.required<StatusOption[]>();
  statusChange = output<AppointmentStatus>();

  onStatusChange(event: Event): void {
    const value = (event.target as HTMLSelectElement)
      .value as AppointmentStatus;
    this.statusChange.emit(value);
  }
}
