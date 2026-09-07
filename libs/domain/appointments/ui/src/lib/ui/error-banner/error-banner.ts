import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'lib-error-banner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      role="alert"
      class="flex items-center justify-between gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg"
    >
      <span class="text-sm">{{ message() }}</span>
      <button
        type="button"
        (click)="retry.emit()"
        class="text-sm font-medium underline focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
      >
        Reintentar
      </button>
    </div>
  `,
})
export class ErrorBannerComponent {
  message = input.required<string>();
  retry = output<void>();
}
