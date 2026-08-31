import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

// libs/domain/products/ui/src/lib/error-banner/error-banner.ts
@Component({
  selector: 'app-error-banner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="p-4 bg-red-100 text-red-700 rounded-lg mb-4 flex items-center justify-between"
    >
      <span>{{ message() }}</span>
      @if (showRetry()) {
        <button (click)="retry.emit()" class="underline text-sm font-medium">
          Reintentar
        </button>
      }
    </div>
  `,
})
export class ErrorBannerComponent {
  message = input.required<string>();
  showRetry = input<boolean>(true);
  retry = output<void>();
}
