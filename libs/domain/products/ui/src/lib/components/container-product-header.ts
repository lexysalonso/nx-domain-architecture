import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink],
  selector: 'container-product-header',
  template: `
    <input
      [value]="search()"
      (input)="searchChange.emit($any($event.target).value)"
      placeholder="Buscar producto"
      class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />

    <div class="flex items-center gap-2 mt-3">
      @for (option of statusOptions; track option.value) {
        <button
          (click)="statusChange.emit(option.value)"
          class="px-3 py-1 text-xs font-medium rounded-full transition-colors"
          [class]="
            statusFilter() === option.value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          "
        >
          {{ option.label }}
        </button>
      }
    </div>

    <div class="flex items-center justify-between mb-4 pt-4">
      <h2 class="text-lg font-semibold text-gray-900">Productos</h2>
      <a
        routerLink="/products/add"
        class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        + Agregar Producto
      </a>
    </div>
  `,
})
export class ContainerProductHeaderComponent {
  search = input<string>();
  statusFilter = input<'all' | 'active' | 'inactive'>('all');
  searchChange = output<string>();
  statusChange = output<'all' | 'active' | 'inactive'>();

  statusOptions = [
    { value: 'all' as const, label: 'Todos' },
    { value: 'active' as const, label: 'Activos' },
    { value: 'inactive' as const, label: 'Inactivos' },
  ];
}
