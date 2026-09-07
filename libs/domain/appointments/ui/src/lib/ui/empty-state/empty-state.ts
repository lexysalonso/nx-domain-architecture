import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'lib-empty-state',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="flex flex-col items-center justify-center py-12 px-4 text-center border border-dashed border-gray-300 rounded-lg"
    >
      <p class="text-sm text-gray-500">{{ message() }}</p>
    </div>
  `,
})
export class EmptyStateComponent {
  message = input.required<string>();
}
