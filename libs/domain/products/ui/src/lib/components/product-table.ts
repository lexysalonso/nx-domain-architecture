import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { ProductViewModel } from '@proj/domain/products/model';

@Component({
  selector: 'app-product-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (loading()) {
      <div class="flex items-center justify-center p-8">
        <p class="text-gray-500">Cargando productos...</p>
      </div>
    } @else if (products().length === 0) {
      <div
        class="p-4 text-center text-gray-500 rounded-lg border border-gray-200"
      >
        No hay productos.
      </div>
    } @else {
      <div class="rounded-lg border border-gray-200 overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nombre
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Precio
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Stock
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Estado
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Categoría
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            @for (p of products(); track p.id) {
              <tr
                class="hover:bg-gray-50 cursor-pointer transition-colors"
                (click)="select.emit({ id: p.id, product: p })"
              >
                <td class="px-4 py-3 text-sm font-medium text-gray-900">
                  {{ p.name }}
                </td>
                <td class="px-4 py-3 text-sm text-gray-700">
                  {{ p.priceFormatted }}
                </td>
                <td class="px-4 py-3 text-sm text-gray-700">{{ p.stock }}</td>
                <td class="px-4 py-3">
                  <span
                    class="text-xs font-medium px-2.5 py-0.5 rounded-full"
                    [class]="
                      p.statusLabel === 'Activo'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    "
                  >
                    {{ p.statusLabel }}
                  </span>
                </td>
                <td class="px-4 py-3 text-sm text-gray-700">
                  {{ p.category }}
                </td>
                <td class="px-4 py-3 text-sm text-gray-700">
                  <button
                    class="text-blue-600 hover:text-blue-900"
                    (click)="edit.emit(p.id); $event.stopPropagation()"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    }
  `,
})
export class ProductTableComponent {
  products = input<ProductViewModel[]>([]);
  loading = input<boolean>(false);
  select = output<{ id: string; product: ProductViewModel }>();
  edit = output<string>(); // NUEVO
}
